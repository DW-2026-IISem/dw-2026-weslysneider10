import { Model } from 'sequelize-typescript';
import { PurchaseStatus } from '../../../domain/entities/purchase.entity';
export declare class PurchaseModel extends Model {
    id: number;
    purchaseDate: Date;
    supplierId: number;
    supplier: unknown;
    branchId: number;
    branch: unknown;
    status: PurchaseStatus;
    subtotal: number;
    tax: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    details: unknown[];
}
