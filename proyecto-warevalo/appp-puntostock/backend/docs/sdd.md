## Preparación MIRIA

Antes de abrir la terminal, registrar en `backend/docs/sdd.md`:

| Elemento | Decisión para PuntoStock |
|---|---|
| M1 | Semana 04: arquitectura por capas y primera capacidad. |
| Objetivo | Construir y explicar una rebanada vertical funcional del backend. |
| Entidades | Sucursal, Producto, Proveedor, Compra, CompraDetalle, Inventario, Cliente, Venta, VentaDetalle, Pago, Devolucion, User, Role, RoleUser, Resource, ResourceRole y RefreshToken. |
| M2 | Campos, invariantes, relaciones, casos de uso, REQ, AC, errores, permisos y contratos. |
| M3 | Issues dependientes, WIP=1, DoR, DoD, pruebas previstas e incidentes. |
| M4 | IA autorizada solo como apoyo; toda salida se revisa, adapta y registra. |
| M5 | Pruebas de dominio, aplicación, adaptadores, API, integración y seguridad. |
| M6 | Gate, evidencias, reflexión y mejora. |




Registra estas entidades y reglas en `docs/sdd.md` antes de crear tablas:

| Grupo | Entidades | Reglas esenciales |
|---|---|---|
| Negocio | Sucursal, Producto, Proveedor | Sucursal activa; proveedor con NIT único; producto con SKU único y precio > 0. |
| Compras | Compra, CompraDetalle | Al menos un ítem; total calculado por servidor; cantidad y valor_unitario > 0; recepción parcial permitida sin cerrar la compra. |
| Inventario | Inventario | Relaciona Sucursal N:M Producto; cantidad ≥ 0 y nunca negativa; alerta cuando cantidad ≤ stock_minimo. |
| Venta | Cliente, Venta, VentaDetalle | Cliente válido y activo; al menos un ítem; total calculado por servidor; cantidad y valor_unitario > 0; no se vende sin disponibilidad en inventario; descuento de stock atómico. |
| Pagos | Pago | Referencia polimórfica válida (`referencia_tipo`/`referencia_id` apunta a Venta o Devolucion); monto > 0; soporta pagos mixtos por una misma venta. |
| Devoluciones | Devolucion | Referencia a una Venta existente; solo referencia líneas realmente vendidas; motivo obligatorio. |
| Identidad | User, RefreshToken | Email/usuario únicos; contraseña con hash; token expirado o revocado no sirve; nunca devolver hash. |
| Autorización | Role, RoleUser, Resource, ResourceRole | Roles iniciales ADMIN, COMPRAS, CAJA, BODEGA, AUDITOR; asociaciones únicas y activas; solo una cadena activa concede permiso. |

Relaciones mínimas: `Proveedor 1:N Compra`, `Compra 1:N CompraDetalle`, `Producto 1:N CompraDetalle`, `Sucursal N:M Producto por Inventario`, `Cliente 1:N Venta`, `Sucursal 1:N Venta`, `Venta 1:N VentaDetalle`, `Producto 1:N VentaDetalle`, `Venta 1:N Pago`, `Venta 1:N Devolucion`, `User N:M Role por RoleUser`, `Role N:M Resource por ResourceRole`, `User 1:N RefreshToken`.