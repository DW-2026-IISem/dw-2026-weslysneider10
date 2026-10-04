import { Transaction } from "sequelize";
import {
  CreatePurchaseDto,
  PurchaseResponseDto,
  ReceivePurchaseDto,
  toPurchaseResponse,
} from "./dto";
import { PurchaseRepository } from "./purchase.repository";
import { Purchase } from "./purchase.model";
import { Supplier } from "../supplier/supplier.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { InventoryRepository } from "../inventory/inventory.repository";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";

/**
 * Capa Service del feature Purchase.
 *
 * Reglas de negocio: validación de Supplier/Branch/Product, cálculo de
 * subtotal/total, flujo de estado (pending -> partial/received, o
 * cancelled), recepción de mercancía (actualiza Inventory reutilizando
 * InventoryRepository) y borrado en cascada (items + cabecera).
 *
 * No conoce `req`/`res`; las operaciones multi-tabla se envuelven en
 * `withTransaction` (commit/rollback automático).
 */
export class PurchaseService {
  public constructor(
    private readonly repository: PurchaseRepository = new PurchaseRepository(),
    private readonly inventoryRepository: InventoryRepository = new InventoryRepository()
  ) {}

  // ================== READ ==================
  public async getAll(filters: {
    supplierId?: number;
    branchId?: number;
    estado?: string;
  }): Promise<PurchaseResponseDto[]> {
    const purchases = await this.repository.findAll(filters);
    return purchases.map((purchase) => toPurchaseResponse(purchase));
  }

  public async getOne(id: number): Promise<PurchaseResponseDto> {
    return toPurchaseResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreatePurchaseDto): Promise<PurchaseResponseDto> {
    if (!body.items || body.items.length === 0) {
      throw new AppError(400, "La compra debe tener al menos un item");
    }

    return withTransaction(async (transaction) => {
      await this.assertSupplierExists(body.supplierId);
      await this.assertBranchExists(body.branchId);

      let subtotal = 0;
      for (const item of body.items) {
        await this.assertProductExists(item.productId);
        if (item.cantidad <= 0 || item.valorUnitario <= 0) {
          throw new AppError(400, "cantidad y valorUnitario deben ser mayores a 0");
        }
        subtotal += item.cantidad * item.valorUnitario;
      }

      const impuestos = body.impuestos ?? 0;
      const total = subtotal + impuestos;

      const purchase = await this.repository.create(
        {
          supplierId: body.supplierId,
          branchId: body.branchId,
          fecha: new Date(),
          subtotal,
          impuestos,
          total,
          estado: "pending",
        },
        transaction
      );

      await this.repository.createDetails(
        body.items.map((item) => ({
          purchaseId: purchase.id,
          productId: item.productId,
          cantidad: item.cantidad,
          valorUnitario: item.valorUnitario,
          total: item.cantidad * item.valorUnitario,
          receivedQuantity: 0,
          observaciones: item.observaciones ?? null,
        })),
        transaction
      );

      const created = await this.repository.findById(purchase.id, transaction);
      return toPurchaseResponse(created as Purchase);
    });
  }

  // ================== RECEIVE ==================
  /** Recepción parcial o total de una compra. Actualiza Inventory de la sucursal. */
  public async receive(id: number, body: ReceivePurchaseDto): Promise<PurchaseResponseDto> {
    return withTransaction(async (transaction) => {
      const purchase = await this.repository.findById(id, transaction);
      if (!purchase) {
        throw new AppError(404, "Purchase not found");
      }

      if (purchase.estado === "cancelled" || purchase.estado === "received") {
        throw new AppError(400, `No se puede recibir una compra en estado '${purchase.estado}'`);
      }

      const items = (purchase as any).items as Array<{
        productId: number;
        cantidad: number;
        receivedQuantity: number;
        update: (data: Record<string, unknown>, opts: { transaction: Transaction }) => Promise<unknown>;
      }>;

      for (const receipt of body.items) {
        const detail = items.find((i) => i.productId === receipt.productId);
        if (!detail) {
          throw new AppError(400, `El producto '${receipt.productId}' no pertenece a esta compra`);
        }
        if (receipt.cantidad <= 0) {
          throw new AppError(400, "La cantidad a recibir debe ser mayor a 0");
        }
        if (detail.receivedQuantity + receipt.cantidad > detail.cantidad) {
          throw new AppError(
            400,
            `La cantidad recibida no puede superar lo solicitado para el producto '${receipt.productId}'`
          );
        }

        await detail.update({ receivedQuantity: detail.receivedQuantity + receipt.cantidad }, { transaction });

        const existingInventory = await this.inventoryRepository.findByBranchAndProduct(
          purchase.branchId,
          receipt.productId
        );

        if (existingInventory) {
          await this.inventoryRepository.update(existingInventory, {
            quantity: existingInventory.quantity + receipt.cantidad,
          });
        } else {
          await this.inventoryRepository.create({
            branchId: purchase.branchId,
            productId: receipt.productId,
            quantity: receipt.cantidad,
            minStock: 0,
          });
        }
      }

      const refreshedItems = await this.repository.findDetailsByPurchaseId(purchase.id, transaction);
      const allReceived = refreshedItems.every((i) => i.receivedQuantity >= i.cantidad);
      const anyReceived = refreshedItems.some((i) => i.receivedQuantity > 0);
      const nuevoEstado = allReceived ? "received" : anyReceived ? "partial" : "pending";

      await this.repository.update(purchase, { estado: nuevoEstado }, transaction);

      const updated = await this.repository.findById(id, transaction);
      return toPurchaseResponse(updated as Purchase);
    });
  }

  // ================== CANCEL ==================
  public async cancel(id: number): Promise<PurchaseResponseDto> {
    const purchase = await this.findOrFail(id);

    if (purchase.estado === "received") {
      throw new AppError(400, "No se puede cancelar una compra ya recibida");
    }

    await this.repository.update(purchase, { estado: "cancelled" });
    return toPurchaseResponse(purchase);
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en una sola transacción. */
  public async deletePhysical(id: number): Promise<void> {
    await withTransaction(async (transaction) => {
      const purchase = await this.repository.findById(id, transaction);
      if (!purchase) {
        throw new AppError(404, "Purchase not found");
      }

      await this.repository.deleteDetailsByPurchaseId(id, transaction);
      await this.repository.delete(purchase, transaction);
    });
  }

  // ================== HELPERS ==================
  private async findOrFail(id: number): Promise<Purchase> {
    const purchase = await this.repository.findById(id);
    if (!purchase) {
      throw new AppError(404, "Purchase not found");
    }
    return purchase;
  }

  private async assertSupplierExists(supplierId: number): Promise<void> {
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      throw new AppError(404, "Supplier not found");
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
