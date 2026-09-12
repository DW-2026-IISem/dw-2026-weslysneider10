import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Inventory } from '../entities/inventory.entity';

export const INVENTORY_REPOSITORY = 'INVENTORY_REPOSITORY';

export interface InventoryFindAllParams {
  page?: number;
  limit?: number;
  branchId?: number;
  productId?: number;
}

export interface InventoryLowStockParams {
  branchId?: number;
}

export interface IInventoryRepository {
  create(inventory: Inventory): Promise<Inventory>;
  update(inventory: Inventory): Promise<Inventory>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Inventory | null>;
  findByBranchAndProduct(
    branchId: number,
    productId: number,
  ): Promise<Inventory | null>;
  findAll(params: InventoryFindAllParams): Promise<PaginatedResult<Inventory>>;
  findLowStock(params: InventoryLowStockParams): Promise<Inventory[]>;
}
