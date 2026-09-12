import { Inject, Injectable } from '@nestjs/common';

import { ProductTypeNotFoundException } from '../../domain/exceptions/product-type-not-found.exception';

import {
  IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../domain/interfaces/product-type-repository.interface';

import { UpdateProductTypeDto } from '../dto/update-product-type.dto';

import { ProductTypeMapper } from '../mappers/product-type.mapper';

@Injectable()
export class UpdateProductTypeUseCase {
  constructor(
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateProductTypeDto,
  ) {
    const productType =
      await this.productTypeRepository.findById(id);

    if (!productType) {
      throw new ProductTypeNotFoundException(id);
    }

    productType.update({
      name: dto.name,
      description: dto.description,
    });

    const updated =
      await this.productTypeRepository.update(
        productType,
      );

    return ProductTypeMapper.toResponse(updated);
  }
}
