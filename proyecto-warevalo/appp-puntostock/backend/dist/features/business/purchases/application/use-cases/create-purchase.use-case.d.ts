import { type ISupplierRepository } from '../../../suppliers/domain/interfaces/supplier-repository.interface';
import { type IBranchRepository } from '../../../branches/domain/interfaces/branch-repository.interface';
import { type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
export declare class CreatePurchaseUseCase {
    private readonly purchaseRepository;
    private readonly supplierRepository;
    private readonly branchRepository;
    private readonly productRepository;
    private readonly purchaseCalculator;
    constructor(purchaseRepository: IPurchaseRepository, supplierRepository: ISupplierRepository, branchRepository: IBranchRepository, productRepository: IProductRepository);
    execute(dto: CreatePurchaseDto): Promise<import("../dto/purchase-response.dto").PurchaseResponseDto>;
}
