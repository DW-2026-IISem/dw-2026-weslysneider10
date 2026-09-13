import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentReferenceType } from '../enums/payment-reference-type.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export interface PaymentProps {
  id?: number;
  referenceType: PaymentReferenceType;
  referenceId: number;
  method: PaymentMethod;
  amount: number;
  paymentDate?: Date;
  status?: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  id?: number;
  referenceType: PaymentReferenceType;
  referenceId: number;
  method: PaymentMethod;
  amount: number;
  paymentDate: Date;
  status: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PaymentProps) {
    this.id = props.id;
    this.referenceType = props.referenceType;
    this.referenceId = props.referenceId;
    this.method = props.method;
    this.amount = props.amount;
    this.paymentDate = props.paymentDate ?? new Date();
    this.status = props.status ?? PaymentStatus.CONFIRMED;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<PaymentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Payment {
    if (!props.referenceId) {
      throw new Error('La referencia del pago es requerida');
    }

    if (props.amount <= 0) {
      throw new Error('El monto del pago debe ser mayor a cero');
    }

    return new Payment(props);
  }

  static reconstitute(props: PaymentProps): Payment {
    return new Payment(props);
  }

  cancel(): void {
    if (this.status === PaymentStatus.CANCELLED) {
      throw new Error('El pago ya está cancelado');
    }
    this.status = PaymentStatus.CANCELLED;
  }
}
