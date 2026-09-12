import { Inject, Injectable } from '@nestjs/common';
import { Branch } from '../../domain/entities/branch.entity';
import {
  type IBranchRepository,
  BRANCH_REPOSITORY,
} from '../../domain/interfaces/branch-repository.interface';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    @Inject(BRANCH_REPOSITORY)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(dto: CreateBranchDto) {
    const branch = Branch.create(dto);
    const created = await this.branchRepository.create(branch);
    return BranchMapper.toResponse(created);
  }
}
