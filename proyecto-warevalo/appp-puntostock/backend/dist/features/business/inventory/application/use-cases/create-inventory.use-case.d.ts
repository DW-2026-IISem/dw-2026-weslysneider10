import { type IBranchRepository } from '../../../branches/domain/interfaces/branch-repository.interface';
import { type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { type IInventoryRepository } from '../../domain/interfaces/inventory-repository.interface';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
export declare class CreateInventoryUseCase {
    private readonly inventoryRepository;
    private readonly branchRepository;
    private readonly productRepository;
    constructor(inventoryRepository: IInventoryRepository, branchRepository: IBranchRepository, productRepository: IProductRepository);
    execute(dto: CreateInventoryDto): Promise<import("../dto/inventory-response.dto").InventoryResponseDto>;
}
