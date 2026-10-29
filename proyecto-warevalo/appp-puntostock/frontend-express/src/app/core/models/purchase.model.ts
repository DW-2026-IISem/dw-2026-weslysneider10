export type PurchaseStatus =
  | 'pending'
  | 'partial'
  | 'received'
  | 'cancelled';

export interface Purchase {
  id?: number;
  supplierId: number;
  branchId: number;
  fecha: string;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: PurchaseStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseDetail {
  id?: number;
  purchaseId?: number;
  productId: number;
  cantidad: number;
  valorUnitario: number;
  total: number;
  receivedQuantity?: number;
  observaciones?: string | null;
}

export type CreatePurchase = Omit<
  Purchase,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdatePurchase = Partial<CreatePurchase>;
