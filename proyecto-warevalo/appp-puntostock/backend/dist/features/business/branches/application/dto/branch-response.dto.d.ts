import { Status } from '../../../../../common/enums/status.enum';
export declare class BranchResponseDto {
    id: number;
    name: string;
    description?: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
