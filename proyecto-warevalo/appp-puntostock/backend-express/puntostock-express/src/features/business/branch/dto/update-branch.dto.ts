/**
 * Datos de entrada de `PUT /api/sucursales/:id` (reemplazo completo).
 *
 * `status` no está aquí a propósito: el estado solo cambia con el borrado
 * lógico (`PATCH /api/sucursales/:id/deactivate`).
 */
export interface UpdateBranchDto {
  name: string;
  description?: string | null;
}
