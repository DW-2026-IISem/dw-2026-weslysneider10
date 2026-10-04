/** Ítem anidado dentro de `CreateSaleDto`. */
export interface CreateSaleItemDto {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}
