import { CreationAttributes, Op, Transaction } from "sequelize";
import { Payment, PaymentI } from "./payment.model";

/**
 * Capa Repository del feature Payment.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class PaymentRepository {
  /** Todos los pagos (filtrables por venta), del más reciente al más antiguo. */
  public async findAll(filters: { saleId?: number } = {}): Promise<Payment[]> {
    const where: Record<string, unknown> = {};
    if (filters.saleId !== undefined) where.saleId = filters.saleId;
    return Payment.findAll({ where, order: [["fecha", "DESC"]] });
  }

  /** Un pago por PK (o `null`). */
  public async findById(id: number, transaction?: Transaction): Promise<Payment | null> {
    return Payment.findByPk(id, { transaction });
  }

  /**
   * Suma de los pagos `completed` de una venta.
   * `excludeId` deja fuera un pago (al editarlo, su monto actual no cuenta).
   */
  public async sumCompletedBySale(
    saleId: number,
    excludeId?: number,
    transaction?: Transaction
  ): Promise<number> {
    const where: Record<string, unknown> = { saleId, estado: "completed" };
    if (excludeId !== undefined) where.id = { [Op.ne]: excludeId };

    const total = await Payment.sum("monto", { where, transaction });
    return Number(total ?? 0);
  }

  /** Inserta un pago. */
  public async create(
    data: CreationAttributes<Payment>,
    transaction?: Transaction
  ): Promise<Payment> {
    return Payment.create(data, { transaction });
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(
    payment: Payment,
    data: Partial<PaymentI>,
    transaction?: Transaction
  ): Promise<Payment> {
    return payment.update(data, { transaction });
  }

  /** Cancela todos los pagos `completed` de una venta (al cancelar la venta). */
  public async cancelAllBySale(saleId: number, transaction?: Transaction): Promise<number> {
    const [affected] = await Payment.update(
      { estado: "cancelled" },
      { where: { saleId, estado: "completed" }, transaction }
    );
    return affected;
  }

  /** Elimina físicamente una instancia. */
  public async delete(payment: Payment): Promise<void> {
    await payment.destroy();
  }
}
