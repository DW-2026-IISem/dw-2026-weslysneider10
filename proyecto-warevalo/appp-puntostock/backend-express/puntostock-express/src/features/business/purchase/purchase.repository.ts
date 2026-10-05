import { CreationAttributes, Transaction } from "sequelize";
import { Purchase } from "./purchase.model";
import { PurchaseDetail } from "./purchase.model";

/**
 * Capa Repository del feature Purchase.
 * Única responsable de hablar con Sequelize (Purchase y su detalle
 * PurchaseDetail). No conoce reglas de negocio ni `req`/`res`.
 */
export class PurchaseRepository {
  /** Todas las compras, filtrables por proveedor/sucursal/estado, con sus items. */
  public async findAll(filters: {
    supplierId?: number;
    branchId?: number;
    estado?: string;
  }): Promise<Purchase[]> {
    const where: Record<string, unknown> = {};
    if (filters.supplierId !== undefined) where.supplierId = filters.supplierId;
    if (filters.branchId !== undefined) where.branchId = filters.branchId;
    if (filters.estado !== undefined) where.estado = filters.estado;

    return Purchase.findAll({
      where,
      include: [{ model: PurchaseDetail, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
  }

  /** Una compra por PK, con sus items (o `null`). Acepta transacción. */
  public async findById(id: number, transaction?: Transaction): Promise<Purchase | null> {
    return Purchase.findByPk(id, {
      include: [{ model: PurchaseDetail, as: "items" }],
      transaction,
    });
  }

  /** Inserta la cabecera de la compra. */
  public async create(data: CreationAttributes<Purchase>, transaction: Transaction): Promise<Purchase> {
    return Purchase.create(data, { transaction });
  }

  /** Inserta los items de la compra en bloque. */
  public async createDetails(
    details: CreationAttributes<PurchaseDetail>[],
    transaction: Transaction
  ): Promise<PurchaseDetail[]> {
    return PurchaseDetail.bulkCreate(details, { transaction });
  }

  /** Todos los items de una compra. Acepta transacción. */
  public async findDetailsByPurchaseId(purchaseId: number, transaction?: Transaction): Promise<PurchaseDetail[]> {
    return PurchaseDetail.findAll({ where: { purchaseId }, transaction });
  }

  /** Persiste cambios sobre un item existente (ej. receivedQuantity). */
  public async updateDetail(
    detail: PurchaseDetail,
    data: Partial<PurchaseDetail>,
    transaction: Transaction
  ): Promise<PurchaseDetail> {
    return detail.update(data, { transaction });
  }

  /** Persiste cambios sobre la cabecera (ej. estado). */
  public async update(purchase: Purchase, data: Partial<Purchase>, transaction?: Transaction): Promise<Purchase> {
    return purchase.update(data, { transaction });
  }

  /** Elimina los items de una compra. */
  public async deleteDetailsByPurchaseId(purchaseId: number, transaction: Transaction): Promise<void> {
    await PurchaseDetail.destroy({ where: { purchaseId }, transaction });
  }

  /** Elimina físicamente la cabecera. */
  public async delete(purchase: Purchase, transaction: Transaction): Promise<void> {
    await purchase.destroy({ transaction });
  }
}
