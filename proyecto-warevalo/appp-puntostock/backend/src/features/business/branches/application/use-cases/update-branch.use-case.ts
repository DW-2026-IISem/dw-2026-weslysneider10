import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../domain/exceptions/branch-not-found.exception';
import {
  type IBranchRepository,
  BRANCH_REPOSITORY,
} from '../../domain/interfaces/branch-repository.interface';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(id: number, dto: UpdateBranchDto) {
    const branch = await this.branchRepository.findById(id);
    if (!branch) {
      throw new BranchNotFoundException(id);
    }

    branch.update(dto);
    const updated = await this.branchRepository.update(branch);
    return BranchMapper.toResponse(updated);
  }
}
