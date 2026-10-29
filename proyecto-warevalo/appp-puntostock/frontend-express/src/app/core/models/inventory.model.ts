export interface Inventory {
  id?: number;
  branchId: number;
  productId: number;
  quantity: number;
  minStock: number;
  updatedAt?: string;
}

export type CreateInventory = Omit<Inventory, 'id' | 'updatedAt'>;

export type UpdateInventory = Partial<CreateInventory>;
