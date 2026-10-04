import {
  CreatePaymentDto,
  PatchPaymentDto,
  PaymentResponseDto,
  UpdatePaymentDto,
  toPaymentResponse,
} from "./dto";
import { PaymentRepository } from "./payment.repository";
import { Payment } from "./payment.model";
import { Sale } from "../sale/sale.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Payment.
 *
 * Reglas de negocio: validación de que `saleId` exista, validación de
 * `metodo` y `monto`, y cancelación (borrado lógico -> estado = cancelled).
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class PaymentService {
  public constructor(
    private readonly repository: PaymentRepository = new PaymentRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.repository.findAll();
    return payments.map((payment) => toPaymentResponse(payment));
  }

  public async getOne(id: number): Promise<PaymentResponseDto> {
    return toPaymentResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreatePaymentDto): Promise<PaymentResponseDto> {
    await this.assertSaleExists(body.saleId);
    this.assertValidMetodo(body.metodo);
    this.assertValidMonto(body.monto);

    const payment = await this.repository.create({
      saleId: body.saleId,
      fecha: body.fecha ?? new Date(),
      metodo: body.metodo,
      monto: body.monto,
      estado: "completed",
    });
    return toPaymentResponse(payment);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.findOrFail(id);
    this.assertValidMetodo(body.metodo);
    this.assertValidMonto(body.monto);

    await this.repository.update(payment, {
      fecha: body.fecha,
      metodo: body.metodo,
      monto: body.monto,
    });
    return toPaymentResponse(payment);
  }

  public async updatePatch(id: number, body: PatchPaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.findOrFail(id);

    if (body.metodo !== undefined) this.assertValidMetodo(body.metodo);
    if (body.monto !== undefined) this.assertValidMonto(body.monto);

    await this.repository.update(payment, body);
    return toPaymentResponse(payment);
  }

  // ================== CANCEL ==================
  /** Cancelación (borrado lógico) -> estado = cancelled. */
  public async cancel(id: number): Promise<PaymentResponseDto> {
    const payment = await this.findOrFail(id);
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
  private async findOrFail(id: number): Promise<Payment> {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new AppError(404, "Payment not found");
    }
    return payment;
  }

  private async assertSaleExists(saleId: number): Promise<void> {
    const sale = await Sale.findByPk(saleId);
    if (!sale) {
      throw new AppError(404, "Sale not found");
    }
  }

  private assertValidMetodo(metodo: string): void {
    if (!metodo || !["cash", "card", "transfer"].includes(metodo)) {
      throw new AppError(400, "Invalid payment method");
    }
  }

  private assertValidMonto(monto: number): void {
    if (!monto || Number(monto) <= 0) {
      throw new AppError(400, "Payment amount must be greater than zero");
    }
  }
}
