import { Branch } from '../../../domain/entities/branch.entity';
import { IBranchRepository, BranchFindAllParams } from '../../../domain/interfaces/branch-repository.interface';
export declare class BranchRepository implements IBranchRepository {
    create(branch: Branch): Promise<Branch>;
    update(branch: Branch): Promise<Branch>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Branch | null>;
    findAll(params: BranchFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Branch>>;
}
