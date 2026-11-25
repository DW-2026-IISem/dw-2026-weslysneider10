import { Model } from 'sequelize-typescript';
export declare class InventoryModel extends Model {
    id: number;
    branchId: number;
    branch: unknown;
    productId: number;
    product: unknown;
    quantity: number;
    minStock: number;
    updatedAt: Date;
}
