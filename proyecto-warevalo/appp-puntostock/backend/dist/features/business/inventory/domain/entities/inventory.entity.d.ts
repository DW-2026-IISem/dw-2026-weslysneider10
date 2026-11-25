export interface InventoryProps {
    id?: number;
    branchId: number;
    productId: number;
    quantity: number;
    minStock: number;
    updatedAt?: Date;
}
export declare class Inventory {
    id?: number;
    branchId: number;
    productId: number;
    quantity: number;
    minStock: number;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<InventoryProps, 'id' | 'updatedAt'>): Inventory;
    static reconstitute(props: InventoryProps): Inventory;
    update(props: Partial<Pick<InventoryProps, 'quantity' | 'minStock'>>): void;
    increaseStock(amount: number): void;
    decreaseStock(amount: number): void;
    isLowStock(): boolean;
}
