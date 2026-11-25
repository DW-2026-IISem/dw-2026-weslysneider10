import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
export declare class CreatePaymentDto {
    referenceType: PaymentReferenceType;
    referenceId: number;
    method: PaymentMethod;
    amount: number;
    paymentDate?: Date;
}
