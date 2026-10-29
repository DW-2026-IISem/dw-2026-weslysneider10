import type { RecordStatus } from './common.model';

export interface Branch {
  id?: number;
  name: string;
  description?: string | null;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateBranch = Omit<
  Branch,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateBranch = Partial<CreateBranch>;
