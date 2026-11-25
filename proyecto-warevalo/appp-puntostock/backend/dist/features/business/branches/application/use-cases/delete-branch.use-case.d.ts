import { type IBranchRepository } from '../../domain/interfaces/branch-repository.interface';
export declare class DeleteBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: IBranchRepository);
    execute(id: number): Promise<void>;
}
