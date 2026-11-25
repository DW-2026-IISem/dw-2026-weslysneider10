import { type ISaleRepository } from '../../domain/interfaces/sale-repository.interface';
export declare class CancelSaleUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(id: number): Promise<import("../dto/sale-response.dto").SaleResponseDto>;
}
