import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
export declare class PaymentFilterDto {
    page?: number;
    limit?: number;
    referenceType?: PaymentReferenceType;
    referenceId?: number;
}
