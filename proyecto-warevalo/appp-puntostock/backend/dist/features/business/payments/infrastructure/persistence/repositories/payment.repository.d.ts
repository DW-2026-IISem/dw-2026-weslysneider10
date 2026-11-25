import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentReferenceType } from '../../../domain/enums/payment-reference-type.enum';
import { IPaymentRepository, PaymentFindAllParams } from '../../../domain/interfaces/payment-repository.interface';
export declare class PaymentRepository implements IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    updateStatus(id: number, status: Payment['status']): Promise<Payment>;
    findById(id: number): Promise<Payment | null>;
    findAll(params: PaymentFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Payment>>;
    findByReference(referenceType: PaymentReferenceType, referenceId: number): Promise<Payment[]>;
    sumConfirmedByReference(referenceType: PaymentReferenceType, referenceId: number): Promise<number>;
}
