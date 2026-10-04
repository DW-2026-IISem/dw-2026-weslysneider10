/** Ítem anidado dentro de `CreatePurchaseDto`. */
export interface CreatePurchaseItemDto {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}
