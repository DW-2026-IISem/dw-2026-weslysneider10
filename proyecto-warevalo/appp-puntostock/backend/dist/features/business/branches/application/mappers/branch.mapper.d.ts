import { Branch } from '../../domain/entities/branch.entity';
import { BranchResponseDto } from '../dto/branch-response.dto';
import { BranchModel } from '../../infrastructure/persistence/models/branch.model';
export declare class BranchMapper {
    static toDomain(model: BranchModel): Branch;
    static toResponse(entity: Branch): BranchResponseDto;
    static toPersistence(entity: Branch): Partial<BranchModel>;
}
