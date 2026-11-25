export declare class CreatePurchaseItemDto {
    productId: number;
    quantityOrdered: number;
    unitCost: number;
}
export declare class CreatePurchaseDto {
    supplierId: number;
    branchId: number;
    items: CreatePurchaseItemDto[];
    tax?: number;
}
