import { Inventory } from '../../../domain/entities/inventory.entity';
import { IInventoryRepository, InventoryFindAllParams, InventoryLowStockParams } from '../../../domain/interfaces/inventory-repository.interface';
export declare class InventoryRepository implements IInventoryRepository {
    create(inventory: Inventory): Promise<Inventory>;
    update(inventory: Inventory): Promise<Inventory>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Inventory | null>;
    findByBranchAndProduct(branchId: number, productId: number): Promise<Inventory | null>;
    findAll(params: InventoryFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Inventory>>;
    findLowStock(params: InventoryLowStockParams): Promise<Inventory[]>;
}
