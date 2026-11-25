import { type IBranchRepository } from '../../domain/interfaces/branch-repository.interface';
export declare class GetBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(id: number): Promise<import("../dto/branch-response.dto").BranchResponseDto>;
}
