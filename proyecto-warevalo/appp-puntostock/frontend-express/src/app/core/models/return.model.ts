export type ReturnStatus = 'pending' | 'approved' | 'rejected';

export interface ReturnRecord {
  id?: number;
  saleDetailId: number;
  fecha: string;
  motivo: string;
  cantidad: number;
  total: number;
  estado: ReturnStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateReturn = Omit<
  ReturnRecord,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateReturn = Partial<CreateReturn>;
