import { Status } from '../../../../../common/enums/status.enum';
export declare class SupplierResponseDto {
    id: number;
    nit: string;
    businessName: string;
    contactName?: string;
    phone?: string;
    email?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
