import { Purchase } from '../../../domain/entities/purchase.entity';
import { IPurchaseRepository, PurchaseFindAllParams } from '../../../domain/interfaces/purchase-repository.interface';
export declare class PurchaseRepository implements IPurchaseRepository {
    create(purchase: Purchase): Promise<Purchase>;
    update(purchase: Purchase): Promise<Purchase>;
    findById(id: number): Promise<Purchase | null>;
    findAll(params: PurchaseFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Purchase>>;
}
