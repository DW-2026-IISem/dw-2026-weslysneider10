import { Module } from '@nestjs/common';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { BranchesModule } from '../branches/branches.module';
import { ProductsModule } from '../products/products.module';
import { InventoriesModule } from '../inventory/inventories.module';
import { PURCHASE_REPOSITORY } from './domain/interfaces/purchase-repository.interface';
import { PurchaseRepository } from './infrastructure/persistence/repositories/purchase.repository';
import { CreatePurchaseUseCase } from './application/use-cases/create-purchase.use-case';
import { ReceivePurchaseUseCase } from './application/use-cases/receive-purchase.use-case';
import { CancelPurchaseUseCase } from './application/use-cases/cancel-purchase.use-case';
import { GetPurchaseUseCase } from './application/use-cases/get-purchase.use-case';
import { ListPurchasesUseCase } from './application/use-cases/list-purchases.use-case';
import { PurchasesController } from './presentation/http/controllers/purchases.controller';

@Module({
  imports: [SuppliersModule, BranchesModule, ProductsModule, InventoriesModule],
  controllers: [PurchasesController],
  providers: [
    PurchaseRepository,
    { provide: PURCHASE_REPOSITORY, useExisting: PurchaseRepository },
    CreatePurchaseUseCase,
    ReceivePurchaseUseCase,
    CancelPurchaseUseCase,
    GetPurchaseUseCase,
    ListPurchasesUseCase,
  ],
  exports: [PURCHASE_REPOSITORY],
})
export class PurchasesModule {}
