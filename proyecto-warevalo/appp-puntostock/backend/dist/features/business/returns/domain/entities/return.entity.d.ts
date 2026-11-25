import { ReturnStatus } from '../enums/return-status.enum';
export interface ReturnLineProps {
    id?: number;
    returnId?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare class ReturnLine {
    id?: number;
    returnId?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
    private constructor();
    static create(props: Omit<ReturnLineProps, 'id' | 'total' | 'returnId'>): ReturnLine;
    static reconstitute(props: ReturnLineProps): ReturnLine;
}
export interface ReturnProps {
    id?: number;
    returnDate: Date;
    reason: string;
    saleId: number;
    status?: ReturnStatus;
    subtotal: number;
    total: number;
    lines?: ReturnLine[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Return {
    id?: number;
    returnDate: Date;
    reason: string;
    saleId: number;
    status: ReturnStatus;
    subtotal: number;
    total: number;
    lines: ReturnLine[];
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ReturnProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Return;
    static reconstitute(props: ReturnProps): Return;
    cancel(): void;
}
