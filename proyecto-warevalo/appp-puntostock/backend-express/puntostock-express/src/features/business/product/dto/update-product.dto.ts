/**
 * Datos de entrada de `PUT /api/productos/:id` (reemplazo completo).
 *
 * `status` no está aquí a propósito: el estado solo cambia con el borrado
 * lógico (`PATCH /api/productos/:id/deactivate`).
 */
export interface UpdateProductDto {
  sku: string;
  name: string;
  description?: string | null;
  price: number;
  productTypeId: number;
}
