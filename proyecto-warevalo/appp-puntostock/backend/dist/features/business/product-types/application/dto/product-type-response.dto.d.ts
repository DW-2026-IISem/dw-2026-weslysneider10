import { Status } from '../../../../../common/enums/status.enum';
export declare class ProductTypeResponseDto {
    id: number;
    name: string;
    description?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
