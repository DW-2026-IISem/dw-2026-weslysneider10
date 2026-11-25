import { Transaction } from "sequelize";
import { CreateSaleDto, CreateSaleItemDto, SaleResponseDto, toSaleResponse } from "./dto";
import { SaleRepository } from "./sale.repository";
import { Sale } from "./sale.model";
import { SaleDetail } from "./sale-detail.model";
import { Client } from "../client/client.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { Inventory } from "../inventory/inventory.model";
import { InventoryRepository } from "../inventory/inventory.repository";
import { PaymentRepository } from "../payment/payment.repository";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";

/**
 * Capa Service del feature Sale.
 *
 * Reglas de negocio: validación de Client/Branch/Product (existen y activos),
 * precio tomado de products.price, validación de disponibilidad en Inventory, descuento de stock al crear, reposición de
 * stock al cancelar (reutilizando InventoryRepository) y borrado en
 * cascada (items + cabecera).
 *
 * No conoce `req`/`res`; las operaciones multi-tabla se envuelven en
 * `withTransaction` (commit/rollback automático).
 */
export class SaleService {
  public constructor(
    private readonly repository: SaleRepository = new SaleRepository(),
    private readonly inventoryRepository: InventoryRepository = new InventoryRepository(),
    private readonly paymentRepository: PaymentRepository = new PaymentRepository()
  ) {}

  // ================== READ ==================
  public async getAll(filters: {
    clientId?: number;
    branchId?: number;
    estado?: string;
  }): Promise<SaleResponseDto[]> {
    const sales = await this.repository.findAll(filters);
    return sales.map((sale) => toSaleResponse(sale));
  }

  public async getOne(id: number): Promise<SaleResponseDto> {
    return toSaleResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  /**
   * Registra una venta en una sucursal.
   *
   * Reglas:
   *  - cliente, sucursal y productos deben existir y estar activos;
   *  - cantidad entera > 0 y sin productos repetidos en la misma venta;
   *  - el precio unitario lo pone el servidor (products.price), nunca el
   *    cliente HTTP: así nadie puede vender a un precio inventado;
   *  - el stock se lee con bloqueo (FOR UPDATE) y se descuenta dentro de la
   *    misma transacción: si algo falla, no se descuenta nada.
   */
  public async create(body: CreateSaleDto): Promise<SaleResponseDto> {
    if (!Array.isArray(body.items) || body.items.length === 0) {
      throw new AppError(400, "La venta debe tener al menos un item");
    }

    const impuestos = Number(body.impuestos ?? 0);
    if (!Number.isFinite(impuestos) || impuestos < 0) {
      throw new AppError(400, "impuestos debe ser un número mayor o igual a 0");
    }

    const productIds = new Set<number>();
    for (const item of body.items) {
      if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw new AppError(400, "cantidad debe ser un entero mayor a 0");
      }
      if (productIds.has(item.productId)) {
        throw new AppError(
          400,
          `El producto '${item.productId}' está repetido; agrupa las cantidades en un solo item`
        );
      }
      productIds.add(item.productId);
    }

    return withTransaction(async (transaction) => {
      await this.assertActiveClient(body.clientId, transaction);
      await this.assertActiveBranch(body.branchId, transaction);

      const lines: Array<{
        item: CreateSaleItemDto;
        valorUnitario: number;
        total: number;
        inventory: Inventory;
      }> = [];

      for (const item of body.items) {
        const product = await this.findActiveProduct(item.productId, transaction);

        const inventory = await this.inventoryRepository.findByBranchAndProduct(
          body.branchId,
          item.productId,
          transaction
        );

        if (!inventory || inventory.quantity < item.cantidad) {
          throw new AppError(
            400,
            `Disponibilidad insuficiente para '${product.name}' en la sucursal '${body.branchId}' ` +
              `(disponible: ${inventory?.quantity ?? 0}, solicitado: ${item.cantidad})`
          );
        }

        const valorUnitario = Number(product.price);
        lines.push({ item, valorUnitario, total: round2(valorUnitario * item.cantidad), inventory });
      }

      const subtotal = round2(lines.reduce((sum, line) => sum + line.total, 0));
      const total = round2(subtotal + impuestos);

      const sale = await this.repository.create(
        {
          clientId: body.clientId,
          branchId: body.branchId,
          fecha: new Date(),
          subtotal,
          impuestos,
          total,
          estado: "completed",
        },
        transaction
      );

      for (const line of lines) {
        await this.repository.createDetail(
          {
            saleId: sale.id,
            productId: line.item.productId,
            cantidad: line.item.cantidad,
            valorUnitario: line.valorUnitario,
            total: line.total,
            observaciones: line.item.observaciones ?? null,
          },
          transaction
        );

        await this.inventoryRepository.update(
          line.inventory,
          { quantity: line.inventory.quantity - line.item.cantidad },
          transaction
        );
      }

      const created = await this.repository.findById(sale.id, transaction);
      return toSaleResponse(created as Sale);
    });
  }

  // ================== CANCEL ==================
  /**
   * Cancela la venta: repone el stock descontado y anula sus pagos
   * (todo en la misma transacción).
   */
  public async cancel(id: number): Promise<SaleResponseDto> {
    return withTransaction(async (transaction) => {
      const sale = await this.repository.findById(id, transaction);
      if (!sale) {
        throw new AppError(404, "Sale not found");
      }

      if (sale.estado === "cancelled") {
        throw new AppError(400, "La venta ya está cancelada");
      }

      const items = (sale as Sale & { items: SaleDetail[] }).items;

      for (const item of items) {
        const inventory = await this.inventoryRepository.findByBranchAndProduct(
          sale.branchId,
          item.productId,
          transaction
        );

        if (inventory) {
          await this.inventoryRepository.update(
            inventory,
            { quantity: inventory.quantity + item.cantidad },
            transaction
          );
        } else {
          await this.inventoryRepository.create(
            {
              branchId: sale.branchId,
              productId: item.productId,
              quantity: item.cantidad,
              minStock: 0,
            },
            transaction
          );
        }
      }

      // Una venta cancelada no puede conservar pagos activos: se anulan con ella.
      await this.paymentRepository.cancelAllBySale(sale.id, transaction);

      await this.repository.update(sale, { estado: "cancelled" }, transaction);

      const updated = await this.repository.findById(id, transaction);
      return toSaleResponse(updated as Sale);
    });
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en transacción (no restaura inventario). */
  public async deletePhysical(id: number): Promise<void> {
    await withTransaction(async (transaction) => {
      const sale = await this.repository.findById(id, transaction);
      if (!sale) {
        throw new AppError(404, "Sale not found");
      }

      await this.repository.deleteDetailsBySaleId(id, transaction);
      await this.repository.delete(sale, transaction);
    });
  }

  // ================== HELPERS ==================
  private async findOrFail(id: number): Promise<Sale> {
    const sale = await this.repository.findById(id);
    if (!sale) {
      throw new AppError(404, "Sale not found");
    }
    return sale;
  }

  private async assertActiveClient(clientId: number, transaction: Transaction): Promise<void> {
    const client = await Client.findByPk(clientId, { transaction });
    if (!client) {
      throw new AppError(404, "Client not found");
    }
    if (client.status !== "active") {
      throw new AppError(400, "El cliente está inactivo");
    }
  }

  private async assertActiveBranch(branchId: number, transaction: Transaction): Promise<void> {
    const branch = await Branch.findByPk(branchId, { transaction });
    if (!branch) {
      throw new AppError(404, "Branch not found");
    }
    if (branch.status !== "active") {
      throw new AppError(400, "La sucursal está inactiva");
    }
  }

  private async findActiveProduct(productId: number, transaction: Transaction): Promise<Product> {
    const product = await Product.findByPk(productId, { transaction });
    if (!product) {
      throw new AppError(404, `Product not found: ${productId}`);
    }
    if (product.status !== "active") {
      throw new AppError(400, `El producto '${product.name}' está inactivo`);
    }
    return product;
  }
}

/** Redondeo a 2 decimales (columnas DECIMAL(12,2)). */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
