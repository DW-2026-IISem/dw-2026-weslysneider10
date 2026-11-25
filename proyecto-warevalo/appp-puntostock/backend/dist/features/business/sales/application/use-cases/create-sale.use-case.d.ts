import { ISaleRepository } from '../../domain/interfaces/sale-repository.interface';
import { SaleCalculatorDomainService } from '../../domain/services/sale-calculator.domain-service';
import { CreateSaleDto } from '../dto/create-sale.dto';
export declare class CreateSaleUseCase {
    private readonly saleRepository;
    private readonly saleCalculator;
    constructor(saleRepository: ISaleRepository, saleCalculator: SaleCalculatorDomainService);
    execute(dto: CreateSaleDto): Promise<import("../dto/sale-response.dto").SaleResponseDto>;
}
