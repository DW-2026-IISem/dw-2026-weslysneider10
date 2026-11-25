/**
 * Venta — refleja las tablas `sales` y `sale_details` del backend
 * campo a campo (mismos nombres, mismos estados).
 */
export type SaleStatus = 'completed' | 'cancelled';

/** Fila de `sale_details`. */
export interface SaleDetailItem {
  id: number;
  saleId: number;
  productId: number;
  cantidad: number;
  /** DECIMAL(12,2): el backend puede devolverlo como string. */
  valorUnitario: number | string;
  total: number | string;
  observaciones: string | null;
  /** Incluido por el backend (SaleDetail.belongsTo(Product, as: 'product')). */
  product?: { id: number; sku: string; name: string };
}

/** Fila de `sales` con sus items. */
export interface Sale {
  id: number;
  clientId: number;
  branchId: number;
  fecha: string;
  subtotal: number | string;
  impuestos: number | string;
  total: number | string;
  estado: SaleStatus;
  createdAt?: string;
  updatedAt?: string;
  items?: SaleDetailItem[];
}

/**
 * Item del cuerpo de POST /api/ventas.
 * No lleva precio: el backend toma products.price (el cliente no fija precios).
 */
export interface SaleCreateItem {
  productId: number;
  cantidad: number;
  observaciones?: string | null;
}

/** Cuerpo de POST /api/ventas. */
export interface SaleCreatePayload {
  clientId: number;
  branchId: number;
  impuestos: number;
  items: SaleCreateItem[];
}
