import { type IBranchRepository } from '../../domain/interfaces/branch-repository.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
export declare class CreateBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(dto: CreateBranchDto): Promise<import("../dto/branch-response.dto").BranchResponseDto>;
}
