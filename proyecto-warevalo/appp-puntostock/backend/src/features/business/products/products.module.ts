import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductModel } from './infrastructure/database/sequelize/models/product.model';
import { ProductRepository } from './infrastructure/database/sequelize/repositories/product.repository';

import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';

import { ProductsController } from './presentation/http/controllers/products.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductModel]),
  ],
  controllers: [
    ProductsController,
  ],
  providers: [
    ProductRepository,
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [
    ProductRepository,
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductsModule {}
