import { Payment, PaymentI } from "../payment.model";

/**
 * Respuesta HTTP de un pago. La usan `GET /api/payments`,
 * `GET /api/payments/:id` y la salida de create/update/cancel.
 */
export type PaymentResponseDto = PaymentI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toPaymentResponse(payment: Payment): PaymentResponseDto {
  return payment.toJSON() as PaymentI;
}
