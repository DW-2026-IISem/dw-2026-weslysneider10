import { Module } from '@nestjs/common';

import { SALE_REPOSITORY } from './domain/interfaces/sale-repository.interface';

import { SaleRepository } from './infrastructure/persistence/repositories/sale.repository';

import { SaleCalculatorDomainService } from './domain/services/sale-calculator.domain-service';

import { CreateSaleUseCase } from './application/use-cases/create-sale.use-case';
import { GetSaleUseCase } from './application/use-cases/get-sale.use-case';
import { ListSalesUseCase } from './application/use-cases/list-sales.use-case';
import { CancelSaleUseCase } from './application/use-cases/cancel-sale.use-case';

import { SalesController } from './presentation/http/controllers/sales.controller';

@Module({
  controllers: [
    SalesController,
  ],

  providers: [
    SaleRepository,

    {
      provide: SALE_REPOSITORY,
      useExisting: SaleRepository,
    },

    SaleCalculatorDomainService,

    CreateSaleUseCase,
    GetSaleUseCase,
    ListSalesUseCase,
    CancelSaleUseCase,
  ],

  exports: [
    SALE_REPOSITORY,
  ],
})
export class SalesModule {}
