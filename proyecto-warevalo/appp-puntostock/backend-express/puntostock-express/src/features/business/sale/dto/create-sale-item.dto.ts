/**
 * Ítem anidado dentro de `CreateSaleDto`.
 * No lleva precio: el servidor usa products.price del producto.
 */
export interface CreateSaleItemDto {
  productId: number;
  cantidad: number;
  observaciones?: string;
}
