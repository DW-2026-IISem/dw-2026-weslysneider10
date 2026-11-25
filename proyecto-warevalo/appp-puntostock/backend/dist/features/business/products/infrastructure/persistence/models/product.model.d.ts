import { Model } from 'sequelize-typescript';
export declare class ProductModel extends Model {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number;
    quantity: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
