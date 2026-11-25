import { Model } from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum';
export declare class SupplierModel extends Model {
    id: number;
    nit: string;
    businessName: string;
    contactName: string | null;
    phone: string | null;
    email: string | null;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
