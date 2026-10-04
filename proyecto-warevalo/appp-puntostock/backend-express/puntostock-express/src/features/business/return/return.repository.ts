import { CreationAttributes, Transaction } from "sequelize";
import { Return, ReturnI } from "./return.model";

/**
 * Capa Repository del feature Return.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class ReturnRepository {
  /** Todas las devoluciones, filtrables por saleDetailId/estado. */
  public async findAll(filters: { saleDetailId?: number; estado?: string }): Promise<Return[]> {
    const where: Record<string, unknown> = {};
    if (filters.saleDetailId !== undefined) where.saleDetailId = filters.saleDetailId;
    if (filters.estado !== undefined) where.estado = filters.estado;

    return Return.findAll({ where, order: [["createdAt", "DESC"]] });
  }

  /** Una devolución por PK (o `null`). Acepta transacción. */
  public async findById(id: number, transaction?: Transaction): Promise<Return | null> {
    return Return.findByPk(id, { transaction });
  }

  /** Devoluciones aprobadas de una línea de venta (para calcular lo ya devuelto). */
  public async findApprovedBySaleDetailId(saleDetailId: number): Promise<Return[]> {
    return Return.findAll({ where: { saleDetailId, estado: "approved" } });
  }

  /** Inserta una devolución. */
  public async create(data: CreationAttributes<Return>): Promise<Return> {
    return Return.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(ret: Return, data: Partial<ReturnI>, transaction?: Transaction): Promise<Return> {
    return ret.update(data, { transaction });
  }

  /** Elimina físicamente una instancia. */
  public async delete(ret: Return): Promise<void> {
    await ret.destroy();
  }
}
