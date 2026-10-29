export interface Supplier {
  id?: number;
  nit: string;
  razonSocial: string;
  contacto?: string | null;
  telefono?: string | null;
  email?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateSupplier = Omit<
  Supplier,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateSupplier = Partial<CreateSupplier>;
