/**
 * Datos de entrada de `PUT /api/clientes/:id` (reemplazo completo).
 *
 * `status` no está aquí a propósito: el estado solo cambia con el borrado
 * lógico (`PATCH /api/clientes/:id/deactivate`), que es una regla de negocio
 * y no un campo editable por PUT/PATCH.
 */
export interface UpdateClientDto {
  name: string;
  address: string;
  phone: string;
  email: string;
  password?: string;
}
