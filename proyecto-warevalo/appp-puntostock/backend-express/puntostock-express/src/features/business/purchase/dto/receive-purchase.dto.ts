import { ReceivePurchaseItemDto } from "./receive-purchase-item.dto";

/** Datos de entrada de `PATCH /api/compras/:id/receive` (recepción parcial o total). */
export interface ReceivePurchaseDto {
  items: ReceivePurchaseItemDto[];
}
