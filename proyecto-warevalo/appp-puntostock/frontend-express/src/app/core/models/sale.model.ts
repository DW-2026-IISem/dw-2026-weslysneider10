export type SaleStatus = 'completed' | 'cancelled';

export interface Sale {
  id?: number;
  clientId: number;
  branchId: number;
  fecha: string;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: SaleStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateSale = Omit<
  Sale,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateSale = Partial<CreateSale>;
