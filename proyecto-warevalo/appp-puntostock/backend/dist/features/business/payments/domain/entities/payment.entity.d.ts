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
export declare class Payment {
    id?: number;
    referenceType: PaymentReferenceType;
    referenceId: number;
    method: PaymentMethod;
    amount: number;
    paymentDate: Date;
    status: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<PaymentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Payment;
    static reconstitute(props: PaymentProps): Payment;
    cancel(): void;
}
