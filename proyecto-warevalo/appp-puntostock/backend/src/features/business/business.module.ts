import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BranchesModule } from './branches/branches.module';
import { InventoriesModule } from './inventory/inventories.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ReturnsModule } from './returns/returns.module';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    SuppliersModule,
    BranchesModule,
    InventoriesModule,
    PurchasesModule,
    ReturnsModule,
  ],
  exports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    SuppliersModule,
    BranchesModule,
    InventoriesModule,
    PurchasesModule,
    ReturnsModule,
  ],
})
export class BusinessModule {}
