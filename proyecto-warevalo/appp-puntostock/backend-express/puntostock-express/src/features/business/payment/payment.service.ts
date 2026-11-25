import { Transaction } from "sequelize";
import {
  CreatePaymentDto,
  PatchPaymentDto,
  PaymentResponseDto,
  UpdatePaymentDto,
  toPaymentResponse,
} from "./dto";
import { PaymentRepository } from "./payment.repository";
import { Payment, PaymentI } from "./payment.model";
import { Sale } from "../sale/sale.model";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";

const METODOS = ["cash", "card", "transfer"] as const;

/**
 * Capa Service del feature Payment.
 *
 * Reglas de negocio:
 *  - un pago pertenece a una venta existente y `completed` (no se paga una
 *    venta cancelada);
 *  - la suma de pagos `completed` de una venta nunca supera su `total`
 *    (saldo pendiente = total - pagado);
 *  - la fila de la venta se bloquea (FOR UPDATE) mientras se valida el
 *    saldo, para que dos pagos simultáneos no lo excedan;
 *  - solo se editan pagos `completed`, y solo fecha / metodo / monto
 *    (saleId y estado no son editables);
 *  - cancelar = borrado lógico (estado = cancelled); libera saldo.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class PaymentService {
  public constructor(
    private readonly repository: PaymentRepository = new PaymentRepository()
  ) {}

  // ================== READ ==================
  public async getAll(filters: { saleId?: number } = {}): Promise<PaymentResponseDto[]> {
    const payments = await this.repository.findAll(filters);
    return payments.map((payment) => toPaymentResponse(payment));
  }

  public async getOne(id: number): Promise<PaymentResponseDto> {
    return toPaymentResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreatePaymentDto): Promise<PaymentResponseDto> {
    const metodo = this.validMetodo(body.metodo);
    const monto = this.validMonto(body.monto);
    const fecha = this.validFecha(body.fecha) ?? new Date();

    return withTransaction(async (transaction) => {
      const sale = await this.lockPayableSale(body.saleId, transaction);
      await this.assertWithinBalance(sale, monto, undefined, transaction);

      const payment = await this.repository.create(
        { saleId: sale.id, fecha, metodo, monto, estado: "completed" },
        transaction
      );
      return toPaymentResponse(payment);
    });
  }

  // ================== UPDATE ==================
  /** PUT: reemplaza fecha, metodo y monto (los tres obligatorios). */
  public async updatePut(id: number, body: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const fecha = this.validFecha(body.fecha);
    if (!fecha) {
      throw new AppError(400, "fecha is required");
    }
    return this.applyUpdate(id, {
      fecha,
      metodo: this.validMetodo(body.metodo),
      monto: this.validMonto(body.monto),
    });
  }

  /** PATCH: solo los campos editables presentes en el cuerpo. */
  public async updatePatch(id: number, body: PatchPaymentDto): Promise<PaymentResponseDto> {
    const data: Partial<PaymentI> = {};
    if (body.fecha !== undefined) data.fecha = this.validFecha(body.fecha) ?? undefined;
    if (body.metodo !== undefined) data.metodo = this.validMetodo(body.metodo);
    if (body.monto !== undefined) data.monto = this.validMonto(body.monto);
    return this.applyUpdate(id, data);
  }

  // ================== CANCEL ==================
  /** Cancelación (borrado lógico) -> estado = cancelled. Libera el saldo de la venta. */
  public async cancel(id: number): Promise<PaymentResponseDto> {
    const payment = await this.findOrFail(id);
    if (payment.estado === "cancelled") {
      throw new AppError(400, "El pago ya está cancelado");
    }
    await this.repository.update(payment, { estado: "cancelled" });
    return toPaymentResponse(payment);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const payment = await this.findOrFail(id);
    await this.repository.delete(payment);
  }

  // ================== HELPERS ==================
  private async applyUpdate(id: number, data: Partial<PaymentI>): Promise<PaymentResponseDto> {
    return withTransaction(async (transaction) => {
      const payment = await this.repository.findById(id, transaction);
      if (!payment) {
        throw new AppError(404, "Payment not found");
      }
      if (payment.estado !== "completed") {
        throw new AppError(400, "Solo se puede modificar un pago en estado 'completed'");
      }

      if (data.monto !== undefined) {
        const sale = await this.lockPayableSale(payment.saleId, transaction);
        await this.assertWithinBalance(sale, data.monto, payment.id, transaction);
      }

      await this.repository.update(payment, data, transaction);
      return toPaymentResponse(payment);
    });
  }

  private async findOrFail(id: number): Promise<Payment> {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new AppError(404, "Payment not found");
    }
    return payment;
  }

  /** Lee la venta bloqueándola y exige que exista y esté `completed`. */
  private async lockPayableSale(saleId: number, transaction: Transaction): Promise<Sale> {
    if (!Number.isInteger(saleId) || saleId < 1) {
      throw new AppError(400, "saleId must be a positive integer");
    }
    const sale = await Sale.findByPk(saleId, { transaction, lock: transaction.LOCK.UPDATE });
    if (!sale) {
      throw new AppError(404, "Sale not found");
    }
    if (sale.estado !== "completed") {
      throw new AppError(400, "No se pueden registrar pagos sobre una venta cancelada");
    }
    return sale;
  }

  /** pagado (sin el pago `excludeId`) + monto <= total de la venta. */
  private async assertWithinBalance(
    sale: Sale,
    monto: number,
    excludeId: number | undefined,
    transaction: Transaction
  ): Promise<void> {
    const pagado = await this.repository.sumCompletedBySale(sale.id, excludeId, transaction);
    const total = Number(sale.total);
    const saldo = round2(total - pagado);

    if (round2(pagado + monto) > total) {
      throw new AppError(
        400,
        `El monto supera el saldo pendiente de la venta #${sale.id} ` +
          `(total: ${total}, pagado: ${pagado}, saldo: ${saldo})`
      );
    }
  }

  private validMetodo(metodo: unknown): PaymentI["metodo"] {
    if (typeof metodo !== "string" || !(METODOS as readonly string[]).includes(metodo)) {
      throw new AppError(400, "Invalid payment method (cash | card | transfer)");
    }
    return metodo as PaymentI["metodo"];
  }

  private validMonto(monto: unknown): number {
    const value = Number(monto);
    if (!Number.isFinite(value) || value <= 0) {
      throw new AppError(400, "Payment amount must be greater than zero");
    }
    return round2(value);
  }

  /** undefined si no viene; 400 si viene pero no es una fecha válida. */
  private validFecha(fecha: unknown): Date | undefined {
    if (fecha === undefined || fecha === null || fecha === "") return undefined;
    const date = new Date(fecha as string);
    if (Number.isNaN(date.getTime())) {
      throw new AppError(400, "fecha must be a valid date");
    }
    return date;
  }
}

/** Redondeo a 2 decimales (columna DECIMAL(12,2)). */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
