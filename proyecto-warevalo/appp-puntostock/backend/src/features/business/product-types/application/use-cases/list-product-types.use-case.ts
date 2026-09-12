import { Inject, Injectable } from '@nestjs/common';

import {
  IProductTypeRepository,
  PRODUCT_TYPE_REPOSITORY,
} from '../../domain/interfaces/product-type-repository.interface';

import { ProductTypeFilterDto } from '../dto/product-type-filter.dto';

import { ProductTypeMapper } from '../mappers/product-type.mapper';

@Injectable()
export class ListProductTypesUseCase {
  constructor(
    @Inject(PRODUCT_TYPE_REPOSITORY)
    private readonly productTypeRepository: IProductTypeRepository,
  ) {}

  async execute(
    filter: ProductTypeFilterDto,
  ) {
    const result =
      await this.productTypeRepository.findAll({
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      });

    return {
      items: result.items.map((productType) =>
        ProductTypeMapper.toResponse(productType),
      ),
      meta: result.meta,
    };
  }
}
