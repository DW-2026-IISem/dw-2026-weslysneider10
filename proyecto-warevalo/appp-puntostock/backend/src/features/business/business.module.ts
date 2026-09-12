import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { BranchesModule } from './branches/branches.module';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    BranchesModule,
  ],
  exports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
    SalesModule,
    BranchesModule,
  ],
})
export class BusinessModule {}
