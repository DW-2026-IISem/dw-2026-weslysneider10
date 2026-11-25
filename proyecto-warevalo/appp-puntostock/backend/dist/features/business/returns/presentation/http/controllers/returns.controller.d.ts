import { CreateReturnDto } from '../../../application/dto/create-return.dto';
import { ReturnFilterDto } from '../../../application/dto/return-filter.dto';
import { ReturnResponseDto } from '../../../application/dto/return-response.dto';
import { CreateReturnUseCase } from '../../../application/use-cases/create-return.use-case';
import { CancelReturnUseCase } from '../../../application/use-cases/cancel-return.use-case';
import { GetReturnUseCase } from '../../../application/use-cases/get-return.use-case';
import { ListReturnsUseCase } from '../../../application/use-cases/list-returns.use-case';
import { ListReturnsBySaleUseCase } from '../../../application/use-cases/list-returns-by-sale.use-case';
export declare class ReturnsController {
    private readonly createReturnUseCase;
    private readonly cancelReturnUseCase;
    private readonly getReturnUseCase;
    private readonly listReturnsUseCase;
    private readonly listReturnsBySaleUseCase;
    constructor(createReturnUseCase: CreateReturnUseCase, cancelReturnUseCase: CancelReturnUseCase, getReturnUseCase: GetReturnUseCase, listReturnsUseCase: ListReturnsUseCase, listReturnsBySaleUseCase: ListReturnsBySaleUseCase);
    create(dto: CreateReturnDto): Promise<ReturnResponseDto>;
    findAll(filter: ReturnFilterDto): Promise<{
        items: ReturnResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findBySale(saleId: number): Promise<ReturnResponseDto[]>;
    findOne(id: number): Promise<ReturnResponseDto>;
    cancel(id: number): Promise<ReturnResponseDto>;
}
