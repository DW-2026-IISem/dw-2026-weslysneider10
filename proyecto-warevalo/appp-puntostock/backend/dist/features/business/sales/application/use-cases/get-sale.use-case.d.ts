import { type ISaleRepository } from '../../domain/interfaces/sale-repository.interface';
export declare class GetSaleUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(id: number): Promise<import("../dto/sale-response.dto").SaleResponseDto>;
}
