import { Status } from '../../../../../common/enums/status.enum';
export declare class ClientResponseDto {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
