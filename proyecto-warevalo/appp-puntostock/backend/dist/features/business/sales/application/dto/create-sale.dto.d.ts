export declare class CreateSaleItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export declare class CreateSaleDto {
    items: CreateSaleItemDto[];
    clientId?: number;
    tax?: number;
    discounts?: number;
}
