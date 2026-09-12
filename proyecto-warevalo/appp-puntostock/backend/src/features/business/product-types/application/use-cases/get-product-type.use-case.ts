import { Inject, Injectable } from '@nestjs/common';

import { ProductTypeNotFoundException } from '../../domain/exceptions/product-type-not-found.exception';

import {
  IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../domain/interfaces/product-type-repository.interface';

import { ProductTypeMapper } from '../mappers/product-type.mapper';

@Injectable()
export class GetProductTypeUseCase {
  constructor(
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(id: number) {
    const productType =
      await this.productTypeRepository.findById(id);

    if (!productType) {
      throw new ProductTypeNotFoundException(id);
    }

    return ProductTypeMapper.toResponse(productType);
  }
}
