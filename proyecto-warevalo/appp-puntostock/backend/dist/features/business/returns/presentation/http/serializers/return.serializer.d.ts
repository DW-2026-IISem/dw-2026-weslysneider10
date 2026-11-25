declare class ReturnLineSerializer {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    total: number;
}
export declare class ReturnSerializer {
    id: number;
    returnDate: Date;
    reason: string;
    saleId: number;
    status: string;
    subtotal: number;
    total: number;
    lines: ReturnLineSerializer[];
    createdAt: Date;
    updatedAt: Date;
}
export {};
