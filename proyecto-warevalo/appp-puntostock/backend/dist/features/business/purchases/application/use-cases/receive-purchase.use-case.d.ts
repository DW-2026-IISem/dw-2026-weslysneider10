import { type IInventoryRepository } from '../../../inventory/domain/interfaces/inventory-repository.interface';
import { type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { ReceivePurchaseDto } from '../dto/receive-purchase.dto';
export declare class ReceivePurchaseUseCase {
    private readonly purchaseRepository;
    private readonly inventoryRepository;
    private readonly productRepository;
    constructor(purchaseRepository: IPurchaseRepository, inventoryRepository: IInventoryRepository, productRepository: IProductRepository);
    execute(id: number, dto: ReceivePurchaseDto): Promise<import("../dto/purchase-response.dto").PurchaseResponseDto>;
}
