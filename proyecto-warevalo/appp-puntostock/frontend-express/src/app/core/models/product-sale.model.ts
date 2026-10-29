export type ProductSaleStatus = 'active' | 'inactive';

export interface ProductSale {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number | string;
  line_total: number | string;
  status: ProductSaleStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductSalePayload {
  sale_id: number;
  product_id: number;
  quantity: number;
  status?: ProductSaleStatus;
}
