import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
export declare class PaymentResponseDto {
    id: number;
    referenceType: PaymentReferenceType;
    referenceId: number;
    method: PaymentMethod;
    amount: number;
    paymentDate: Date;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}
