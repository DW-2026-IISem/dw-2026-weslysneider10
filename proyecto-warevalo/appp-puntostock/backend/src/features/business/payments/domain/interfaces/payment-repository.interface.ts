import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Payment } from '../entities/payment.entity';
import { PaymentReferenceType } from '../enums/payment-reference-type.enum';

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';

export interface PaymentFindAllParams {
  page?: number;
  limit?: number;
  referenceType?: PaymentReferenceType;
  referenceId?: number;
}

export interface IPaymentRepository {
  create(payment: Payment): Promise<Payment>;
  updateStatus(id: number, status: Payment['status']): Promise<Payment>;
  findById(id: number): Promise<Payment | null>;
  findAll(params: PaymentFindAllParams): Promise<PaginatedResult<Payment>>;
  findByReference(
    referenceType: PaymentReferenceType,
    referenceId: number,
  ): Promise<Payment[]>;
  sumConfirmedByReference(
    referenceType: PaymentReferenceType,
    referenceId: number,
  ): Promise<number>;
}
