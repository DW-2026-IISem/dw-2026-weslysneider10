/**
 * Catálogo de los recursos del sistema (fuente única).
 *
 * Un recurso es un par (method, path); un permiso es la concesión de un
 * recurso a un rol. Este archivo es la definición en código del catálogo que
 * puebla el seeder de resources y del que se derivan las concesiones de los
 * roles (ADMIN recibe todos; SELLER, los marcados con seller: true).
 *
 * Composición (proyecto puntostock-express, 10 features de negocio):
 *
 * | Grupo                      | Recursos |
 * |-----------------------------|---------:|
 * | Clientes                    | 7 |
 * | Sucursales                  | 7 |
 * | Tipos de producto           | 7 |
 * | Productos                   | 7 |
 * | Proveedores                 | 7 |
 * | Inventarios                 | 7 |
 * | Compras                     | 6 |
 * | Ventas                      | 5 |
 * | Pagos                       | 7 |
 * | Devoluciones                | 6 |
 * | Usuarios                    | 9 |
 * | Roles                       | 7 |
 * | Recursos                    | 7 |
 * | Asignaciones usuario-rol    | 5 |
 * | Concesiones rol-recurso     | 5 |
 * | **Total**                   | **99** |
 *
 * Nota: las operaciones de sesión (/api/sesion/* y /api/sesiones/*) no son
 * recursos RBAC. Son las modalidades OPEN y JWT: no dependen de la matriz de
 * permisos, sino de poseer (o no) una identidad válida.
 */
export interface CatalogResource {
  method: string;
  path: string;
  description: string;
  /** `true` si el rol SELLER recibe esta concesión. */
  seller?: boolean;
}

export const RESOURCE_CATALOG: readonly CatalogResource[] = [
  // ── Clientes (7) ──────────────────────────────────────────────
  { method: "GET", path: "/api/clientes", description: "Listar clientes", seller: true },
  { method: "GET", path: "/api/clientes/:id", description: "Consultar cliente", seller: true },
  { method: "POST", path: "/api/clientes", description: "Crear cliente" },
  { method: "PUT", path: "/api/clientes/:id", description: "Reemplazar cliente" },
  { method: "PATCH", path: "/api/clientes/:id", description: "Modificar cliente" },
  { method: "DELETE", path: "/api/clientes/:id", description: "Eliminar cliente" },
  { method: "PATCH", path: "/api/clientes/:id/deactivate", description: "Desactivar cliente" },

  // ── Sucursales (7) ────────────────────────────────────────────
  { method: "GET", path: "/api/sucursales", description: "Listar sucursales" },
  { method: "GET", path: "/api/sucursales/:id", description: "Consultar sucursal" },
  { method: "POST", path: "/api/sucursales", description: "Crear sucursal" },
  { method: "PUT", path: "/api/sucursales/:id", description: "Reemplazar sucursal" },
  { method: "PATCH", path: "/api/sucursales/:id", description: "Modificar sucursal" },
  { method: "DELETE", path: "/api/sucursales/:id", description: "Eliminar sucursal" },
  { method: "PATCH", path: "/api/sucursales/:id/deactivate", description: "Desactivar sucursal" },

  // ── Tipos de producto (7) ─────────────────────────────────────
  { method: "GET", path: "/api/tipos-producto", description: "Listar tipos de producto" },
  { method: "GET", path: "/api/tipos-producto/:id", description: "Consultar tipo de producto" },
  { method: "POST", path: "/api/tipos-producto", description: "Crear tipo de producto" },
  { method: "PUT", path: "/api/tipos-producto/:id", description: "Reemplazar tipo de producto" },
  { method: "PATCH", path: "/api/tipos-producto/:id", description: "Modificar tipo de producto" },
  { method: "DELETE", path: "/api/tipos-producto/:id", description: "Eliminar tipo de producto" },
  {
    method: "PATCH",
    path: "/api/tipos-producto/:id/deactivate",
    description: "Desactivar tipo de producto",
  },

  // ── Productos (7) ─────────────────────────────────────────────
  { method: "GET", path: "/api/productos", description: "Listar productos", seller: true },
  { method: "GET", path: "/api/productos/:id", description: "Consultar producto", seller: true },
  { method: "POST", path: "/api/productos", description: "Crear producto" },
  { method: "PUT", path: "/api/productos/:id", description: "Reemplazar producto" },
  { method: "PATCH", path: "/api/productos/:id", description: "Modificar producto" },
  { method: "DELETE", path: "/api/productos/:id", description: "Eliminar producto" },
  { method: "PATCH", path: "/api/productos/:id/deactivate", description: "Desactivar producto" },

  // ── Proveedores (7) ───────────────────────────────────────────
  { method: "GET", path: "/api/proveedores", description: "Listar proveedores" },
  { method: "GET", path: "/api/proveedores/:id", description: "Consultar proveedor" },
  { method: "POST", path: "/api/proveedores", description: "Crear proveedor" },
  { method: "PUT", path: "/api/proveedores/:id", description: "Reemplazar proveedor" },
  { method: "PATCH", path: "/api/proveedores/:id", description: "Modificar proveedor" },
  { method: "DELETE", path: "/api/proveedores/:id", description: "Eliminar proveedor" },
  { method: "PATCH", path: "/api/proveedores/:id/deactivate", description: "Desactivar proveedor" },

  // ── Inventarios (7) ───────────────────────────────────────────
  { method: "GET", path: "/api/inventarios", description: "Listar inventarios" },
  { method: "GET", path: "/api/inventarios/low-stock", description: "Listar inventarios con stock bajo" },
  { method: "GET", path: "/api/inventarios/:id", description: "Consultar inventario" },
  { method: "POST", path: "/api/inventarios", description: "Crear registro de inventario" },
  { method: "PUT", path: "/api/inventarios/:id", description: "Reemplazar inventario" },
  { method: "PATCH", path: "/api/inventarios/:id", description: "Modificar inventario" },
  { method: "DELETE", path: "/api/inventarios/:id", description: "Eliminar inventario" },

  // ── Compras (6) ───────────────────────────────────────────────
  { method: "GET", path: "/api/compras", description: "Listar compras" },
  { method: "GET", path: "/api/compras/:id", description: "Consultar compra" },
  { method: "POST", path: "/api/compras", description: "Crear compra" },
  { method: "PATCH", path: "/api/compras/:id/receive", description: "Recibir compra (parcial o total)" },
  { method: "PATCH", path: "/api/compras/:id/cancel", description: "Cancelar compra" },
  { method: "DELETE", path: "/api/compras/:id", description: "Eliminar compra" },

  // ── Ventas (5) ────────────────────────────────────────────────
  { method: "GET", path: "/api/ventas", description: "Listar ventas", seller: true },
  { method: "GET", path: "/api/ventas/:id", description: "Consultar venta", seller: true },
  { method: "POST", path: "/api/ventas", description: "Registrar venta", seller: true },
  { method: "PATCH", path: "/api/ventas/:id/cancel", description: "Cancelar venta" },
  { method: "DELETE", path: "/api/ventas/:id", description: "Eliminar venta" },

  // ── Pagos (7) ─────────────────────────────────────────────────
  { method: "GET", path: "/api/payments", description: "Listar pagos" },
  { method: "GET", path: "/api/payments/:id", description: "Consultar pago" },
  { method: "POST", path: "/api/payments", description: "Crear pago" },
  { method: "PUT", path: "/api/payments/:id", description: "Reemplazar pago" },
  { method: "PATCH", path: "/api/payments/:id", description: "Modificar pago" },
  { method: "PATCH", path: "/api/payments/:id/cancel", description: "Cancelar pago" },
  { method: "DELETE", path: "/api/payments/:id", description: "Eliminar pago" },

  // ── Devoluciones (6) ──────────────────────────────────────────
  { method: "GET", path: "/api/devoluciones", description: "Listar devoluciones" },
  { method: "GET", path: "/api/devoluciones/:id", description: "Consultar devolución" },
  { method: "POST", path: "/api/devoluciones", description: "Crear devolución" },
  { method: "PATCH", path: "/api/devoluciones/:id/approve", description: "Aprobar devolución" },
  { method: "PATCH", path: "/api/devoluciones/:id/reject", description: "Rechazar devolución" },
  { method: "DELETE", path: "/api/devoluciones/:id", description: "Eliminar devolución" },

  // ── Usuarios (9) ──────────────────────────────────────────────
  { method: "GET", path: "/api/usuarios", description: "Listar usuarios" },
  { method: "GET", path: "/api/usuarios/:id", description: "Consultar usuario" },
  { method: "POST", path: "/api/usuarios", description: "Crear usuario" },
  { method: "PUT", path: "/api/usuarios/:id", description: "Reemplazar usuario" },
  { method: "PATCH", path: "/api/usuarios/:id", description: "Modificar usuario" },
  { method: "DELETE", path: "/api/usuarios/:id", description: "Eliminar usuario" },
  { method: "PATCH", path: "/api/usuarios/:id/deactivate", description: "Desactivar usuario" },
  { method: "PATCH", path: "/api/usuarios/:id/password", description: "Cambiar contraseña de usuario" },
  {
    method: "GET",
    path: "/api/usuarios/:id/permisos",
    description: "Consultar permisos efectivos del usuario",
  },

  // ── Roles (7) ─────────────────────────────────────────────────
  { method: "GET", path: "/api/roles", description: "Listar roles" },
  { method: "GET", path: "/api/roles/:id", description: "Consultar rol" },
  { method: "POST", path: "/api/roles", description: "Crear rol" },
  { method: "PUT", path: "/api/roles/:id", description: "Reemplazar rol" },
  { method: "PATCH", path: "/api/roles/:id", description: "Modificar rol" },
  { method: "DELETE", path: "/api/roles/:id", description: "Eliminar rol" },
  { method: "PATCH", path: "/api/roles/:id/deactivate", description: "Desactivar rol" },

  // ── Recursos (7) ──────────────────────────────────────────────
  { method: "GET", path: "/api/recursos", description: "Listar recursos" },
  { method: "GET", path: "/api/recursos/:id", description: "Consultar recurso" },
  { method: "POST", path: "/api/recursos", description: "Crear recurso" },
  { method: "PUT", path: "/api/recursos/:id", description: "Reemplazar recurso" },
  { method: "PATCH", path: "/api/recursos/:id", description: "Modificar recurso" },
  { method: "DELETE", path: "/api/recursos/:id", description: "Eliminar recurso" },
  { method: "PATCH", path: "/api/recursos/:id/deactivate", description: "Desactivar recurso" },

  // ── Asignaciones usuario ↔ rol (5) ────────────────────────────
  { method: "GET", path: "/api/asignaciones-rol", description: "Listar asignaciones usuario-rol" },
  { method: "GET", path: "/api/asignaciones-rol/:id", description: "Consultar asignación usuario-rol" },
  { method: "POST", path: "/api/asignaciones-rol", description: "Asignar rol a usuario" },
  { method: "PATCH", path: "/api/asignaciones-rol/:id/deactivate", description: "Retirar rol a usuario" },
  { method: "PATCH", path: "/api/asignaciones-rol/:id/reactivate", description: "Reactivar rol a usuario" },

  // ── Concesiones rol ↔ recurso (5) ─────────────────────────────
  { method: "GET", path: "/api/concesiones-rol", description: "Listar concesiones rol-recurso" },
  { method: "GET", path: "/api/concesiones-rol/:id", description: "Consultar concesión rol-recurso" },
  { method: "POST", path: "/api/concesiones-rol", description: "Conceder recurso a rol" },
  { method: "PATCH", path: "/api/concesiones-rol/:id/deactivate", description: "Retirar recurso a rol" },
  { method: "PATCH", path: "/api/concesiones-rol/:id/reactivate", description: "Reactivar recurso a rol" },
];

/** Recursos que recibe el rol SELLER (7). Derivado del catálogo, no duplicado. */
export const SELLER_RESOURCES: readonly CatalogResource[] = RESOURCE_CATALOG.filter(
  (resource) => resource.seller === true
);
