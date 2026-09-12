import { Branch } from '../../../domain/entities/branch.entity';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto';
import { BranchMapper } from '../../../application/mappers/branch.mapper';

export class BranchSerializer {
  static serialize(entity: Branch): BranchResponseDto {
    return BranchMapper.toResponse(entity);
  }
}
