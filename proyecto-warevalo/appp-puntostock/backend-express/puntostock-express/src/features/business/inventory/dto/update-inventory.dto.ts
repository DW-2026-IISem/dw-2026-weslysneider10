/**
 * Datos de entrada de `PUT /api/inventarios/:id` (reemplazo completo).
 *
 * `branchId` y `productId` no están aquí a propósito: forman la clave
 * compuesta del registro y no se editan — para mover stock a otra
 * sucursal/producto se crea un nuevo registro de inventario.
 */
export interface UpdateInventoryDto {
  quantity: number;
  minStock: number;
}
