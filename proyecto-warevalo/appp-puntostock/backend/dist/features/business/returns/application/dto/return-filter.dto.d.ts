import { ReturnStatus } from '../../domain/enums/return-status.enum';
export declare class ReturnFilterDto {
    page?: number;
    limit?: number;
    saleId?: number;
    status?: ReturnStatus;
}
