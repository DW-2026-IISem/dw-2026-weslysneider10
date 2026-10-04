import { UpdatePaymentDto } from "./update-payment.dto";

/** Datos de entrada de `PATCH /api/payments/:id` (actualización parcial). */
export type PatchPaymentDto = Partial<UpdatePaymentDto>;
