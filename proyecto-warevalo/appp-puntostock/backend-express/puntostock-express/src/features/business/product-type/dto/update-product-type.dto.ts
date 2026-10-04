/**
 * Datos de entrada de `PUT /api/tipos-productos/:id` (reemplazo completo).
 *
 * `status` no está aquí a propósito: el estado solo cambia con el borrado
 * lógico (`PATCH /api/tipos-productos/:id/deactivate`).
 */
export interface UpdateProductTypeDto {
  name: string;
  description?: string | null;
}
