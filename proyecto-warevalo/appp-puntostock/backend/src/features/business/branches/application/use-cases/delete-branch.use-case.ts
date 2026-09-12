import { Inject, Injectable } from '@nestjs/common';
import { BranchNotFoundException } from '../../domain/exceptions/branch-not-found.exception';
import {
  type IBranchRepository,
  BRANCH_REPOSITORY,
} from '../../domain/interfaces/branch-repository.interface';

@Injectable()
export class DeleteBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const branch = await this.branchRepository.findById(id);
    if (!branch) {
      throw new BranchNotFoundException(id);
    }

    await this.branchRepository.delete(id);
  }
}
