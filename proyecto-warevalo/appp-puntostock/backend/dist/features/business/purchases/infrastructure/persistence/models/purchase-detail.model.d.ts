import { Model } from 'sequelize-typescript';
export declare class PurchaseDetailModel extends Model {
    id: number;
    productId: number;
    product: unknown;
    purchaseId: number;
    purchase: unknown;
    quantityOrdered: number;
    quantityReceived: number;
    unitCost: number;
    total: number;
}
