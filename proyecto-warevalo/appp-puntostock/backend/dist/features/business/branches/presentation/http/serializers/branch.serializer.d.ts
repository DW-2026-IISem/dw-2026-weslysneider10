import { Branch } from '../../../domain/entities/branch.entity';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto';
export declare class BranchSerializer {
    static serialize(entity: Branch): BranchResponseDto;
}
