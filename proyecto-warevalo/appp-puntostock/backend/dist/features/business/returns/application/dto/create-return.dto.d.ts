export declare class CreateReturnItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateReturnDto {
    saleId: number;
    reason: string;
    items: CreateReturnItemDto[];
}
