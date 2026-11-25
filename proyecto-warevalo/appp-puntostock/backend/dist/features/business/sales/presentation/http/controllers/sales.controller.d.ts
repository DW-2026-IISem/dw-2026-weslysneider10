import { CreateSaleDto } from '../../../application/dto/create-sale.dto';
import { SaleFilterDto } from '../../../application/dto/sale-filter.dto';
import { SaleResponseDto } from '../../../application/dto/sale-response.dto';
import { CreateSaleUseCase } from '../../../application/use-cases/create-sale.use-case';
import { CancelSaleUseCase } from '../../../application/use-cases/cancel-sale.use-case';
import { GetSaleUseCase } from '../../../application/use-cases/get-sale.use-case';
import { ListSalesUseCase } from '../../../application/use-cases/list-sales.use-case';
export declare class SalesController {
    private readonly createSaleUseCase;
    private readonly cancelSaleUseCase;
    private readonly getSaleUseCase;
    private readonly listSalesUseCase;
    constructor(createSaleUseCase: CreateSaleUseCase, cancelSaleUseCase: CancelSaleUseCase, getSaleUseCase: GetSaleUseCase, listSalesUseCase: ListSalesUseCase);
    create(dto: CreateSaleDto): Promise<SaleResponseDto>;
    findAll(filter: SaleFilterDto): Promise<{
        items: SaleResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<SaleResponseDto>;
    cancel(id: number): Promise<SaleResponseDto>;
}
