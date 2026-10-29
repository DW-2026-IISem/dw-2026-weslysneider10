import type { RecordStatus } from './common.model';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number | string;
  min_stock: number;
  quantity: number;
  product_type_id: number;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  name: string;
  brand: string;
  price: number;
  min_stock: number;
  quantity: number;
  product_type_id: number;
  status?: RecordStatus;
}

export type UpdateProductPayload = Partial<ProductPayload>;

/* Compatibilidad con el servicio anterior. */
export type CreateProduct = ProductPayload;
export type UpdateProduct = UpdateProductPayload;
export type PatchProduct = Partial<UpdateProductPayload>;
