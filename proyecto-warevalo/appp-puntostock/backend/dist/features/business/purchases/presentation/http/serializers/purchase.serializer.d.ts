declare class PurchaseDetailSerializer {
    id: number;
    productId: number;
    quantityOrdered: number;
    quantityReceived: number;
    unitCost: number;
    total: number;
}
export declare class PurchaseSerializer {
    id: number;
    purchaseDate: Date;
    supplierId: number;
    branchId: number;
    status: string;
    subtotal: number;
    tax: number;
    total: number;
    items: PurchaseDetailSerializer[];
    createdAt: Date;
    updatedAt: Date;
}
export {};
