import { type IBranchRepository } from '../../domain/interfaces/branch-repository.interface';
import { UpdateBranchDto } from '../dto/update-branch.dto';
export declare class UpdateBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(id: number, dto: UpdateBranchDto): Promise<import("../dto/branch-response.dto").BranchResponseDto>;
}
