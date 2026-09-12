import { Status } from '../../../../../common/enums/status.enum';
import { Branch } from '../../domain/entities/branch.entity';
import { BranchResponseDto } from '../dto/branch-response.dto';
import { BranchModel } from '../../infrastructure/persistence/models/branch.model';

export class BranchMapper {
  static toDomain(model: BranchModel): Branch {
    return Branch.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Branch): BranchResponseDto {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Branch): Partial<BranchModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description ?? null,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
