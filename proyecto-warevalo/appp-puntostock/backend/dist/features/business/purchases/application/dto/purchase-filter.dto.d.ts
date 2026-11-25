import { PurchaseStatus } from '../../domain/entities/purchase.entity';
export declare class PurchaseFilterDto {
    page?: number;
    limit?: number;
    supplierId?: number;
    branchId?: number;
    status?: PurchaseStatus;
}
