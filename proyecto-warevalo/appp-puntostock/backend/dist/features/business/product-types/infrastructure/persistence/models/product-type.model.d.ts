import { Model } from 'sequelize-typescript';
import { Status } from '../../../../../../common/enums/status.enum';
export declare class ProductTypeModel extends Model {
    id: number;
    name: string;
    description: string | null;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
