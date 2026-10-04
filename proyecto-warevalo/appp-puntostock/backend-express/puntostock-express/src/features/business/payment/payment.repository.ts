import { CreationAttributes } from "sequelize";
import { Payment, PaymentI } from "./payment.model";

/**
 * Capa Repository del feature Payment.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
export class PaymentRepository {
  /** Todos los pagos. */
  public async findAll(): Promise<Payment[]> {
    return Payment.findAll();
  }

  /** Un pago por PK (o `null`). */
  public async findById(id: number): Promise<Payment | null> {
    return Payment.findByPk(id);
  }

  /** Inserta un pago. */
  public async create(data: CreationAttributes<Payment>): Promise<Payment> {
    return Payment.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(payment: Payment, data: Partial<PaymentI>): Promise<Payment> {
    return payment.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(payment: Payment): Promise<void> {
    await payment.destroy();
  }
}
