import { Module } from '@nestjs/common';
import { BranchesModule } from '../branches/branches.module';
import { ProductsModule } from '../products/products.module';
import { INVENTORY_REPOSITORY } from './domain/interfaces/inventory-repository.interface';
import { InventoryRepository } from './infrastructure/persistence/repositories/inventory.repository';
import { CreateInventoryUseCase } from './application/use-cases/create-inventory.use-case';
import { UpdateInventoryUseCase } from './application/use-cases/update-inventory.use-case';
import { DeleteInventoryUseCase } from './application/use-cases/delete-inventory.use-case';
import { GetInventoryUseCase } from './application/use-cases/get-inventory.use-case';
import { ListInventoryUseCase } from './application/use-cases/list-inventory.use-case';
import { ListLowStockUseCase } from './application/use-cases/list-low-stock.use-case';
import { InventoriesController } from './presentation/http/controllers/inventories.controller';

@Module({
  imports: [BranchesModule, ProductsModule],
  controllers: [InventoriesController],
  providers: [
    InventoryRepository,
    { provide: INVENTORY_REPOSITORY, useExisting: InventoryRepository },
    CreateInventoryUseCase,
    UpdateInventoryUseCase,
    DeleteInventoryUseCase,
    GetInventoryUseCase,
    ListInventoryUseCase,
    ListLowStockUseCase,
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoriesModule {}
