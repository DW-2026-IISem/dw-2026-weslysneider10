/**
 * Datos de entrada de `POST /api/concesiones-rol` — conceder un recurso a un rol.
 *
 * Esta operación crea un permiso: la tupla (role_id, resource_id)
 * materializada en resource_roles. Si ya existía inactiva, se reactiva.
 */
export interface CreateResourceRoleDto {
  role_id: number;
  resource_id: number;
}
