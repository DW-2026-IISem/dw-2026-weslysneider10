import { ReturnStatus } from '../../domain/enums/return-status.enum';
export declare class ReturnLineResponseDto {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare class ReturnResponseDto {
    id: number;
    returnDate: Date;
    reason: string;
    saleId: number;
    status: ReturnStatus;
    subtotal: number;
    total: number;
    lines: ReturnLineResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
