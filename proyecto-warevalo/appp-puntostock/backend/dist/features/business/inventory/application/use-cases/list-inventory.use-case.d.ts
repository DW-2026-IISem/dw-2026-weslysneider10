import { type IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface';
import { InventoryFilterDto } from '../dto/inventory-filter.dto';
export declare class ListInventoryUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(filter: InventoryFilterDto): Promise<{
        items: import("../dto/inventory-response.dto").InventoryResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
