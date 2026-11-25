import { type IBranchRepository } from '../../domain/interfaces/branch-repository.interface';
import { BranchFilterDto } from '../dto/branch-filter.dto';
export declare class ListBranchesUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(filter: BranchFilterDto): Promise<{
        items: import("../dto/branch-response.dto").BranchResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
