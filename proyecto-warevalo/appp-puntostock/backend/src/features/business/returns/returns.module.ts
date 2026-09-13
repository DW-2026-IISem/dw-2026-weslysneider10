import { Module } from '@nestjs/common';
import { SalesModule } from '../sales/sales.module';
import { ProductsModule } from '../products/products.module';
import { RETURN_REPOSITORY } from './domain/interfaces/return-repository.interface';
import { ReturnRepository } from './infrastructure/persistence/repositories/return.repository';
import { CreateReturnUseCase } from './application/use-cases/create-return.use-case';
import { CancelReturnUseCase } from './application/use-cases/cancel-return.use-case';
import { GetReturnUseCase } from './application/use-cases/get-return.use-case';
import { ListReturnsUseCase } from './application/use-cases/list-returns.use-case';
import { ListReturnsBySaleUseCase } from './application/use-cases/list-returns-by-sale.use-case';
import { ReturnsController } from './presentation/http/controllers/returns.controller';

@Module({
  imports: [SalesModule, ProductsModule],
  controllers: [ReturnsController],
  providers: [
    ReturnRepository,
    { provide: RETURN_REPOSITORY, useExisting: ReturnRepository },
    CreateReturnUseCase,
    CancelReturnUseCase,
    GetReturnUseCase,
    ListReturnsUseCase,
    ListReturnsBySaleUseCase,
  ],
  exports: [RETURN_REPOSITORY],
})
export class ReturnsModule {}
