import { CreationAttributes, Transaction } from "sequelize";
import { Sale } from "./sale.model";
import { SaleDetail } from "./sale-detail.model";

/**
 * Capa Repository del feature Sale.
 * Única responsable de hablar con Sequelize (Sale y su detalle
 * SaleDetail). No conoce reglas de negocio ni `req`/`res`.
 */
export class SaleRepository {
  /** Todas las ventas, filtrables por cliente/sucursal/estado, con sus items. */
  public async findAll(filters: {
    clientId?: number;
    branchId?: number;
    estado?: string;
  }): Promise<Sale[]> {
    const where: Record<string, unknown> = {};
    if (filters.clientId !== undefined) where.clientId = filters.clientId;
    if (filters.branchId !== undefined) where.branchId = filters.branchId;
    if (filters.estado !== undefined) where.estado = filters.estado;

    return Sale.findAll({
      where,
      include: [{ model: SaleDetail, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
  }

  /** Una venta por PK, con sus items (o `null`). Acepta transacción. */
  public async findById(id: number, transaction?: Transaction): Promise<Sale | null> {
    return Sale.findByPk(id, {
      include: [{ model: SaleDetail, as: "items" }],
      transaction,
    });
  }

  /** Inserta la cabecera de la venta. */
  public async create(data: CreationAttributes<Sale>, transaction: Transaction): Promise<Sale> {
    return Sale.create(data, { transaction });
  }

  /** Inserta un item de la venta. */
  public async createDetail(
    data: CreationAttributes<SaleDetail>,
    transaction: Transaction
  ): Promise<SaleDetail> {
    return SaleDetail.create(data, { transaction });
  }

  /** Persiste cambios sobre la cabecera (ej. estado). */
  public async update(sale: Sale, data: Partial<Sale>, transaction?: Transaction): Promise<Sale> {
    return sale.update(data, { transaction });
  }

  /** Elimina los items de una venta. */
  public async deleteDetailsBySaleId(saleId: number, transaction: Transaction): Promise<void> {
    await SaleDetail.destroy({ where: { saleId }, transaction });
  }

  /** Elimina físicamente la cabecera. */
  public async delete(sale: Sale, transaction: Transaction): Promise<void> {
    await sale.destroy({ transaction });
  }
}
