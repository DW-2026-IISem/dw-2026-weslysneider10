import { Module } from '@nestjs/common';
import { BRANCH_REPOSITORY } from './domain/interfaces/branch-repository.interface';
import { BranchRepository } from './infrastructure/persistence/repositories/branch.repository';
import { CreateBranchUseCase } from './application/use-cases/create-branch.use-case';
import { UpdateBranchUseCase } from './application/use-cases/update-branch.use-case';
import { DeleteBranchUseCase } from './application/use-cases/delete-branch.use-case';
import { GetBranchUseCase } from './application/use-cases/get-branch.use-case';
import { ListBranchesUseCase } from './application/use-cases/list-branches.use-case';
import { BranchesController } from './presentation/http/controllers/branches.controller';

@Module({
  controllers: [BranchesController],
  providers: [
    BranchRepository,
    { provide: BRANCH_REPOSITORY, useExisting: BranchRepository },
    CreateBranchUseCase,
    UpdateBranchUseCase,
    DeleteBranchUseCase,
    GetBranchUseCase,
    ListBranchesUseCase,
  ],
  exports: [BRANCH_REPOSITORY],
})
export class BranchesModule {}
