import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Purchase, PurchaseStatus } from '../entities/purchase.entity';

export const PURCHASE_REPOSITORY = 'PURCHASE_REPOSITORY';

export interface PurchaseFindAllParams {
  page?: number;
  limit?: number;
  supplierId?: number;
  branchId?: number;
  status?: PurchaseStatus;
}

export interface IPurchaseRepository {
  create(purchase: Purchase): Promise<Purchase>;
  update(purchase: Purchase): Promise<Purchase>;
  findById(id: number): Promise<Purchase | null>;
  findAll(params: PurchaseFindAllParams): Promise<PaginatedResult<Purchase>>;
}
