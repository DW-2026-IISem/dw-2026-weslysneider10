import { CreateBranchDto } from '../../../application/dto/create-branch.dto';
import { UpdateBranchDto } from '../../../application/dto/update-branch.dto';
import { BranchFilterDto } from '../../../application/dto/branch-filter.dto';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto';
import { CreateBranchUseCase } from '../../../application/use-cases/create-branch.use-case';
import { UpdateBranchUseCase } from '../../../application/use-cases/update-branch.use-case';
import { DeleteBranchUseCase } from '../../../application/use-cases/delete-branch.use-case';
import { GetBranchUseCase } from '../../../application/use-cases/get-branch.use-case';
import { ListBranchesUseCase } from '../../../application/use-cases/list-branches.use-case';
export declare class BranchesController {
    private readonly createBranchUseCase;
    private readonly updateBranchUseCase;
    private readonly deleteBranchUseCase;
    private readonly getBranchUseCase;
    private readonly listBranchesUseCase;
    constructor(createBranchUseCase: CreateBranchUseCase, updateBranchUseCase: UpdateBranchUseCase, deleteBranchUseCase: DeleteBranchUseCase, getBranchUseCase: GetBranchUseCase, listBranchesUseCase: ListBranchesUseCase);
    create(dto: CreateBranchDto): Promise<BranchResponseDto>;
    findAll(filter: BranchFilterDto): Promise<{
        items: BranchResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<BranchResponseDto>;
    update(id: number, dto: UpdateBranchDto): Promise<BranchResponseDto>;
    remove(id: number): Promise<void>;
}
