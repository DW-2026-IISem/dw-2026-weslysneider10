export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PaymentStatus = 'completed' | 'cancelled';

export interface Payment {
  id?: number;
  saleId: number;
  fecha: string;
  metodo: PaymentMethod;
  monto: number;
  estado: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePayment = Omit<
  Payment,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdatePayment = Partial<CreatePayment>;
