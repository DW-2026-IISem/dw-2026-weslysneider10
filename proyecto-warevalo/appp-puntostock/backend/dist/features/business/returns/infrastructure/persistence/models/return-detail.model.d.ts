import { Model } from 'sequelize-typescript';
export declare class ReturnDetailModel extends Model {
    id: number;
    returnId: number;
    returnHeader: unknown;
    productId: number;
    product: unknown;
    quantity: number;
    unitPrice: number;
    total: number;
}
