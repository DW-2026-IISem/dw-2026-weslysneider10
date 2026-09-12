import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../domain/exceptions/branch-not-found.exception';
import {
  type IBranchRepository,
  BRANCH_REPOSITORY,
} from '../../domain/interfaces/branch-repository.interface';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class GetBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(id: number) {
    const branch = await this.branchRepository.findById(id);
    if (!branch) {
      throw new BranchNotFoundException(id);
    }

    return BranchMapper.toResponse(branch);
  }
}
