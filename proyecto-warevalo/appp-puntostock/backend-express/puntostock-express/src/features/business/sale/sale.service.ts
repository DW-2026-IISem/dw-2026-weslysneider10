import { CreateSaleDto, SaleResponseDto, toSaleResponse } from "./dto";
import { SaleRepository } from "./sale.repository";
import { Sale } from "./sale.model";
import { Client } from "../client/client.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { InventoryRepository } from "../inventory/inventory.repository";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";

/**
 * Capa Service del feature Sale.
 *
 * Reglas de negocio: validación de Client/Branch/Product, validación de
 * disponibilidad en Inventory, descuento de stock al crear, reposición de
 * stock al cancelar (reutilizando InventoryRepository) y borrado en
 * cascada (items + cabecera).
 *
 * No conoce `req`/`res`; las operaciones multi-tabla se envuelven en
 * `withTransaction` (commit/rollback automático).
 */
export class SaleService {
  public constructor(
    private readonly repository: SaleRepository = new SaleRepository(),
    private readonly inventoryRepository: InventoryRepository = new InventoryRepository()
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
  public async create(body: CreateSaleDto): Promise<SaleResponseDto> {
    if (!body.items || body.items.length === 0) {
      throw new AppError(400, "La venta debe tener al menos un item");
    }

    return withTransaction(async (transaction) => {
      await this.assertClientExists(body.clientId);
      await this.assertBranchExists(body.branchId);

      let subtotal = 0;
      const inventories: Array<{ productId: number; quantity: number; update: Function }> = [];

      for (const item of body.items) {
        await this.assertProductExists(item.productId);
        if (item.cantidad <= 0 || item.valorUnitario <= 0) {
          throw new AppError(400, "cantidad y valorUnitario deben ser mayores a 0");
        }

        const inventory = await this.inventoryRepository.findByBranchAndProduct(
          body.branchId,
          item.productId
        );

        if (!inventory || inventory.quantity < item.cantidad) {
          throw new AppError(
            400,
            `Disponibilidad insuficiente para el producto '${item.productId}' en la sucursal '${body.branchId}'`
          );
        }

        inventories.push(inventory as any);
        subtotal += item.cantidad * item.valorUnitario;
      }

      const impuestos = body.impuestos ?? 0;
      const total = subtotal + impuestos;

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

      for (let i = 0; i < body.items.length; i++) {
        const item = body.items[i];
        const inventory = inventories[i] as any;

        await this.repository.createDetail(
          {
            saleId: sale.id,
            productId: item.productId,
            cantidad: item.cantidad,
            valorUnitario: item.valorUnitario,
            total: item.cantidad * item.valorUnitario,
            observaciones: item.observaciones ?? null,
          },
          transaction
        );

        await this.inventoryRepository.update(inventory, {
          quantity: inventory.quantity - item.cantidad,
        });
      }

      const created = await this.repository.findById(sale.id, transaction);
      return toSaleResponse(created as Sale);
    });
  }

  // ================== CANCEL ==================
  /** Cancela la venta y repone el stock descontado. */
  public async cancel(id: number): Promise<SaleResponseDto> {
    return withTransaction(async (transaction) => {
      const sale = await this.repository.findById(id, transaction);
      if (!sale) {
        throw new AppError(404, "Sale not found");
      }

      if (sale.estado === "cancelled") {
        throw new AppError(400, "La venta ya está cancelada");
      }

      const items = (sale as any).items as Array<{ productId: number; cantidad: number }>;

      for (const item of items) {
        const inventory = await this.inventoryRepository.findByBranchAndProduct(
          sale.branchId,
          item.productId
        );

        if (inventory) {
          await this.inventoryRepository.update(inventory, {
            quantity: inventory.quantity + item.cantidad,
          });
        } else {
          await this.inventoryRepository.create({
            branchId: sale.branchId,
            productId: item.productId,
            quantity: item.cantidad,
            minStock: 0,
          });
        }
      }

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

  private async assertClientExists(clientId: number): Promise<void> {
    const client = await Client.findByPk(clientId);
    if (!client) {
      throw new AppError(404, "Client not found");
    }
  }

  private async assertBranchExists(branchId: number): Promise<void> {
    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      throw new AppError(404, "Branch not found");
    }
  }

  private async assertProductExists(productId: number): Promise<void> {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError(404, `Product not found: ${productId}`);
    }
  }
}
