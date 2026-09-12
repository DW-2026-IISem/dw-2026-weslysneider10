import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';

import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [
    ClientsModule,
    ProductTypesModule,
  ],

  exports: [
    ClientsModule,
    ProductTypesModule,
  ],
})
export class BusinessModule {}
