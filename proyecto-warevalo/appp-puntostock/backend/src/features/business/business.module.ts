import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
  ],

  exports: [
    ClientsModule,
    ProductTypesModule,
    ProductsModule,
  ],
})
export class BusinessModule {}
