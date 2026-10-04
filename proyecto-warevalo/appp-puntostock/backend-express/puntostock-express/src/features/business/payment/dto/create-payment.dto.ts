/** Datos de entrada de `POST /api/payments`. */
export interface CreatePaymentDto {
  saleId: number;
  fecha?: Date;
  metodo: "cash" | "card" | "transfer";
  monto: number;
}
