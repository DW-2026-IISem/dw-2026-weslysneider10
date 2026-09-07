## Entrada 002 — Instalación de dependencias del backend

**Contexto:** **Fecha:** 07/09/2026 · **Autor:** Wesly Sneider · **Issue:** #05 · **REQ/AC:** REQ-S04-05 / AC-S04-05

```bash
npm install @nestjs/config @nestjs/sequelize sequelize sequelize-typescript class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express helmet
npm install @nestjs/jwt passport passport-jwt @nestjs/passport bcrypt
npm install pg
npm install --save-dev @types/bcrypt @types/passport-jwt

# PostgreSQL
npm install pg
```

**Decisión:** Se instala `PostgreSQL` (pg) como driver de base de datos. Motor elegido libremente entre las opciones de la Semana 02. 

**Justificación para PuntoStock:**

- **Integridad transaccional del agregado Venta:** la regla de negocio de impedir ventas sin disponibilidad exige que la validación de stock en `Inventario`, el descuento de existencias y la creación de `VentaDetalle` y `Pago` ocurran en una sola transacción atómica; si algo falla, ninguna parte debe quedar registrada. Este comportamiento ACID es un punto fuerte histórico de Postgres.

- **Constraints declarativos:** invariantes como el `UNIQUE` de `Producto.sku`, `Proveedor.nit` y `Cliente.numero_documento`, o las llaves foráneas entre `CompraDetalle`/`VentaDetalle` y sus cabeceras, se apoyan mejor en el motor de constraints, índices únicos y `FOREIGN KEY` de Postgres.

- **Consistencia en inventario multisede:** `Inventario` relaciona `Sucursal` y `Producto` (N:M) con cantidades y `stock_minimo` por ubicación; los `CHECK constraints` (ej. `cantidad >= 0`) y las transacciones concurrentes seguras de Postgres evitan condiciones de carrera al descontar stock desde varias ventas simultáneas.

- **Pagos mixtos y trazabilidad:** `Pago` referencia `Venta` o `Devolucion` mediante `referencia_tipo`/`referencia_id`; Postgres permite validar esta relación polimórfica con constraints e índices compuestos, manteniendo la integridad entre múltiples métodos de pago por una misma venta.