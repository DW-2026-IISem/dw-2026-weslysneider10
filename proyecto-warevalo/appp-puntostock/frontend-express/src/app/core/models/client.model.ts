import type { RecordStatus } from './common.model';

export interface Client {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  password?: string;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateClient = Partial<CreateClient>;
