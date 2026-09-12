import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { BranchesModule } from './branches/branches.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    BranchesModule,
    SuppliersModule,
  ],
  exports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    BranchesModule,
    SuppliersModule,
  ],
})
export class BusinessModule {}
