export declare enum PurchaseStatus {
    PENDING = "PENDING",
    PARTIALLY_RECEIVED = "PARTIALLY_RECEIVED",
    RECEIVED = "RECEIVED",
    CANCELLED = "CANCELLED"
}
export interface PurchaseItemProps {
    id?: number;
    purchaseId?: number;
    productId: number;
    quantityOrdered: number;
    quantityReceived?: number;
    unitCost: number;
    total: number;
}
export declare class PurchaseItem {
    id?: number;
    purchaseId?: number;
    productId: number;
    quantityOrdered: number;
    quantityReceived: number;
    unitCost: number;
    total: number;
    private constructor();
    static create(props: Omit<PurchaseItemProps, 'id' | 'total' | 'purchaseId' | 'quantityReceived'>): PurchaseItem;
    static reconstitute(props: PurchaseItemProps): PurchaseItem;
    get pendingQuantity(): number;
    receive(quantity: number): void;
}
export interface PurchaseProps {
    id?: number;
    purchaseDate: Date;
    supplierId: number;
    branchId: number;
    status?: PurchaseStatus;
    subtotal: number;
    tax: number;
    total: number;
    items?: PurchaseItem[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Purchase {
    id?: number;
    purchaseDate: Date;
    supplierId: number;
    branchId: number;
    status: PurchaseStatus;
    subtotal: number;
    tax: number;
    total: number;
    items: PurchaseItem[];
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<PurchaseProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Purchase;
    static reconstitute(props: PurchaseProps): Purchase;
    private recalculateStatus;
    receiveItems(receipts: {
        productId: number;
        quantity: number;
    }[]): void;
    cancel(): void;
}
