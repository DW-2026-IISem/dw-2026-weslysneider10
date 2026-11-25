import { type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnFilterDto } from '../dto/return-filter.dto';
export declare class ListReturnsUseCase {
    private readonly returnRepository;
    constructor(returnRepository: IReturnRepository);
    execute(filter: ReturnFilterDto): Promise<{
        items: import("../dto/return-response.dto").ReturnResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
