import { type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { PurchaseFilterDto } from '../dto/purchase-filter.dto';
export declare class ListPurchasesUseCase {
    private readonly purchaseRepository;
    constructor(purchaseRepository: IPurchaseRepository);
    execute(filter: PurchaseFilterDto): Promise<{
        items: import("../dto/purchase-response.dto").PurchaseResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
