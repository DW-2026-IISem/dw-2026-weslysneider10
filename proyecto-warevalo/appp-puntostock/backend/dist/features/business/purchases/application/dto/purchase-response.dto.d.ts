import { PurchaseStatus } from '../../domain/entities/purchase.entity';
export declare class PurchaseDetailResponseDto {
    id: number;
    productId: number;
    quantityOrdered: number;
    quantityReceived: number;
    unitCost: number;
    total: number;
}
export declare class PurchaseResponseDto {
    id: number;
    purchaseDate: Date;
    supplierId: number;
    branchId: number;
    status: PurchaseStatus;
    subtotal: number;
    tax: number;
    total: number;
    items: PurchaseDetailResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
