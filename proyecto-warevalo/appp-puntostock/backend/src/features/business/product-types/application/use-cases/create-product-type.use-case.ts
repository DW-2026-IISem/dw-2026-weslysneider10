import { Inject, Injectable } from '@nestjs/common';

import { ProductType } from '../../domain/entities/product-type.entity';

import {
  IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../domain/interfaces/product-type-repository.interface';

import { CreateProductTypeDto } from '../dto/create-product-type.dto';

import { ProductTypeMapper } from '../mappers/product-type.mapper';

@Injectable()
export class CreateProductTypeUseCase {
  constructor(
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(
    dto: CreateProductTypeDto,
  ) {
    const productType = ProductType.create({
      name: dto.name,
      description: dto.description,
    });

    const created =
      await this.productTypeRepository.create(
        productType,
      );

    return ProductTypeMapper.toResponse(created);
  }
}
