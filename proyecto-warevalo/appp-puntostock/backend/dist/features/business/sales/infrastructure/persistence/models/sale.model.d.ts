import { Model } from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum';
export declare class SaleModel extends Model {
    id: number;
    saleDate: Date;
    subtotal: number;
    tax: number;
    discounts: number;
    total: number;
    status: Status;
    clientId: number;
    client: unknown;
    createdAt: Date;
    updatedAt: Date;
    items: unknown[];
}
