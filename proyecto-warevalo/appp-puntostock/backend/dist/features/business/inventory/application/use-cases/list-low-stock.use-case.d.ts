import { type IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface';
export declare class ListLowStockUseCase {
    private readonly inventoryRepository;
    constructor(inventoryRepository: IInventoryRepository);
    execute(branchId?: number): Promise<import("../dto/inventory-response.dto").InventoryResponseDto[]>;
}
