import { Inject, Injectable } from '@nestjs/common';
import {
  type IBranchRepository,
  BRANCH_REPOSITORY,
} from '../../domain/interfaces/branch-repository.interface';
import { BranchFilterDto } from '../dto/branch-filter.dto';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class ListBranchesUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(filter: BranchFilterDto) {
    const result = await this.branchRepository.findAll(filter);
    return {
      items: result.items.map((b) => BranchMapper.toResponse(b)),
      meta: result.meta,
    };
  }
}
