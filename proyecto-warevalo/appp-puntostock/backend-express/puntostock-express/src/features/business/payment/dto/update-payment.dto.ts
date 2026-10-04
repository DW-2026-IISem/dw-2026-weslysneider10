/**
 * Datos de entrada de `PUT /api/payments/:id` (reemplazo completo).
 *
 * `estado` no está aquí a propósito: el estado solo cambia con
 * `PATCH /api/payments/:id/cancel`.
 */
export interface UpdatePaymentDto {
  fecha: Date;
  metodo: "cash" | "card" | "transfer";
  monto: number;
}
