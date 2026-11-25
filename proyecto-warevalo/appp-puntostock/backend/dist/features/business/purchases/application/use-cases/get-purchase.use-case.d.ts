import { type IPurchaseRepository } from '../../domain/interfaces/purchase-repository.interface';
export declare class GetPurchaseUseCase {
    private readonly purchaseRepository;
    constructor(purchaseRepository: IPurchaseRepository);
    execute(id: number): Promise<import("../dto/purchase-response.dto").PurchaseResponseDto>;
}
