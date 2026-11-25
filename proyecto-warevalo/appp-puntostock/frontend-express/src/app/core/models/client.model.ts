import type { RecordStatus } from './common.model';

/** Cliente — refleja la tabla `clients` del backend (sin credenciales: un cliente no inicia sesión). */
export interface Client {
  id?: number;
  name: string;
  /** Opcionales: el backend guarda NULL cuando no se conocen. */
  address: string | null;
  phone: string | null;
  email: string | null;
  status: RecordStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateClient = Partial<CreateClient>;
