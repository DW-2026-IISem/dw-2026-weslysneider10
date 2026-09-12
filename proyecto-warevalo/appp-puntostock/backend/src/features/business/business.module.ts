import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ClientsModule,
    ProductsModule,
  ],
  exports: [
    ClientsModule,
    ProductsModule,
  ],
})
export class BusinessModule {}
