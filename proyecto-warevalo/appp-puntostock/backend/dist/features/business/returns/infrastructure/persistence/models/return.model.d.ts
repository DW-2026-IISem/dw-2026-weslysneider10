import { Model } from 'sequelize-typescript';
import { ReturnStatus } from '../../../domain/enums/return-status.enum';
export declare class ReturnModel extends Model {
    id: number;
    returnDate: Date;
    reason: string;
    saleId: number;
    sale: unknown;
    status: ReturnStatus;
    subtotal: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    details: unknown[];
}
