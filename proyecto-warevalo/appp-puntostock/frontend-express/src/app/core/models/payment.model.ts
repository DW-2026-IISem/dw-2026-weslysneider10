/** Pago — refleja la tabla `payments` del backend campo a campo. */
export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PaymentStatus = 'completed' | 'cancelled';

export interface Payment {
  id: number;
  saleId: number;
  fecha: string;
  metodo: PaymentMethod;
  /** DECIMAL(12,2): el backend puede devolverlo como string. */
  monto: number | string;
  estado: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Cuerpo de POST /api/pagos.
 * Sin `estado`: el backend siempre crea el pago como `completed`.
 */
export interface CreatePayment {
  saleId: number;
  fecha?: string;
  metodo: PaymentMethod;
  monto: number;
}

/** Cuerpo de PUT /api/pagos/:id (saleId y estado no son editables). */
export interface UpdatePayment {
  fecha: string;
  metodo: PaymentMethod;
  monto: number;
}
