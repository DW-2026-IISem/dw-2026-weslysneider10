import { Model } from 'sequelize-typescript';
export declare class ProductSaleModel extends Model {
    id: number;
    total: number;
    productId: number;
    product: unknown;
    saleId: number;
    sale: unknown;
    quantity: number;
    unitPrice: number;
}
