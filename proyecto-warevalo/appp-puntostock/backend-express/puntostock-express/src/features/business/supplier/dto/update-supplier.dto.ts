/**
 * Datos de entrada de `PUT /api/proveedores/:id` (reemplazo completo).
 *
 * `isActive` no está aquí a propósito: el estado solo cambia con el borrado
 * lógico (`PATCH /api/proveedores/:id/deactivate`).
 */
export interface UpdateSupplierDto {
  nit: string;
  razonSocial: string;
  contacto?: string | null;
  telefono?: string | null;
  email?: string | null;
}
