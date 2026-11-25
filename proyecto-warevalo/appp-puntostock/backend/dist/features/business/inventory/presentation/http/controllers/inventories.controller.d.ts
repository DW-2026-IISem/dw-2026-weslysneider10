import { CreateInventoryDto } from '../../../application/dto/create-inventory.dto';
import { UpdateInventoryDto } from '../../../application/dto/update-inventory.dto';
import { InventoryFilterDto } from '../../../application/dto/inventory-filter.dto';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case';
import { UpdateInventoryUseCase } from '../../../application/use-cases/update-inventory.use-case';
import { DeleteInventoryUseCase } from '../../../application/use-cases/delete-inventory.use-case';
import { GetInventoryUseCase } from '../../../application/use-cases/get-inventory.use-case';
import { ListInventoryUseCase } from '../../../application/use-cases/list-inventory.use-case';
import { ListLowStockUseCase } from '../../../application/use-cases/list-low-stock.use-case';
export declare class InventoriesController {
    private readonly createInventoryUseCase;
    private readonly updateInventoryUseCase;
    private readonly deleteInventoryUseCase;
    private readonly getInventoryUseCase;
    private readonly listInventoryUseCase;
    private readonly listLowStockUseCase;
    constructor(createInventoryUseCase: CreateInventoryUseCase, updateInventoryUseCase: UpdateInventoryUseCase, deleteInventoryUseCase: DeleteInventoryUseCase, getInventoryUseCase: GetInventoryUseCase, listInventoryUseCase: ListInventoryUseCase, listLowStockUseCase: ListLowStockUseCase);
    create(dto: CreateInventoryDto): Promise<InventoryResponseDto>;
    findAll(filter: InventoryFilterDto): Promise<{
        items: InventoryResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findLowStock(branchId?: string): Promise<InventoryResponseDto[]>;
    findOne(id: number): Promise<InventoryResponseDto>;
    update(id: number, dto: UpdateInventoryDto): Promise<InventoryResponseDto>;
    remove(id: number): Promise<void>;
}
