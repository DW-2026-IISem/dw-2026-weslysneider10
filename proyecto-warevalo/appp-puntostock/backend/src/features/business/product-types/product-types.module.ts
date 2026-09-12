import { Module } from '@nestjs/common';

import {
  PRODUCT_TYPE_REPOSITORY,
} from './domain/interfaces/product-type-repository.interface';

import { ProductTypeRepository } from './infrastructure/persistence/repositories/product-type.repository';

import { CreateProductTypeUseCase } from './application/use-cases/create-product-type.use-case';
import { DeleteProductTypeUseCase } from './application/use-cases/delete-product-type.use-case';
import { GetProductTypeUseCase } from './application/use-cases/get-product-type.use-case';
import { ListProductTypesUseCase } from './application/use-cases/list-product-types.use-case';
import { UpdateProductTypeUseCase } from './application/use-cases/update-product-type.use-case';

import { ProductTypesController } from './presentation/http/controllers/product-types.controller';

@Module({
  controllers: [
    ProductTypesController,
  ],

  providers: [
    ProductTypeRepository,

    {
      provide: PRODUCT_TYPE_REPOSITORY,
      useExisting: ProductTypeRepository,
    },

    CreateProductTypeUseCase,
    UpdateProductTypeUseCase,
    DeleteProductTypeUseCase,
    GetProductTypeUseCase,
    ListProductTypesUseCase,
  ],

  exports: [
    PRODUCT_TYPE_REPOSITORY,
  ],
})
export class ProductTypesModule {}
