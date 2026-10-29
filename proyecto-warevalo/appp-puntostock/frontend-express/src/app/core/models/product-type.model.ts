import type { RecordStatus } from './common.model';

export interface ProductType {
  id?: number;
  name: string;
  description?: string | null;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductType = Omit<
  ProductType,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProductType = Partial<CreateProductType>;

export interface ProductTypePayload {
  name: string;
  description: string | null;
  status?: RecordStatus;
}
