import type { RecordStatus } from './common.model';

/**
 * Producto — refleja la tabla `products` del backend campo a campo.
 *
 * El producto NO tiene stock: las existencias viven en `inventories`
 * (una fila por sucursal + producto, con quantity y minStock).
 */
export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  /** DECIMAL(12,2): el backend puede devolverlo como string. */
  price: number | string;
  productTypeId: number;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** Cuerpo de POST /api/productos y PUT /api/productos/:id. */
export interface ProductPayload {
  sku: string;
  name: string;
  description: string | null;
  price: number;
  productTypeId: number;
  status?: RecordStatus;
}

export type UpdateProductPayload = Partial<ProductPayload>;
