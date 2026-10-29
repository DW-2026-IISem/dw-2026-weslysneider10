export type SaleStatus = 'completed' | 'cancelled' | 'active' | 'inactive';

export interface SaleItem {
  id?: number;
  product_id: number;
  quantity: number;
  unit_price: number | string;
  line_total: number | string;
  product?: {
    id: number;
    name: string;
  };
}

export interface Sale {
  id: number;
  client_id: number;
  subtotal: number | string;
  tax: number | string;
  discounts: number | string;
  total: number | string;
  status: SaleStatus;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  items?: SaleItem[];
}

export interface SaleCreateItem {
  product_id: number;
  quantity: number;
}

export interface SaleCreatePayload {
  client_id: number;
  tax: number;
  discounts: number;
  items: SaleCreateItem[];
}

export type SaleUpdatePayload = Partial<SaleCreatePayload>;
