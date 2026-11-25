import { type ISaleRepository } from '../../domain/interfaces/sale-repository.interface';
import { SaleFilterDto } from '../dto/sale-filter.dto';
export declare class ListSalesUseCase {
    private readonly saleRepository;
    constructor(saleRepository: ISaleRepository);
    execute(filter: SaleFilterDto): Promise<{
        items: import("../dto/sale-response.dto").SaleResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
