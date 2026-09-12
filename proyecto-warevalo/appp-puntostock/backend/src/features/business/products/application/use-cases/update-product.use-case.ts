import { Inject, Injectable } from '@nestjs/common';

import { ProductNotFoundException } from '../../domain/exceptions/product-not-found.exception';

import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product-repository.interface';

import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateProductDto,
  ) {
    const product =
      await this.productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    if (dto.sku && dto.sku !== product.sku) {
      const existing =
        await this.productRepository.findBySku(dto.sku);

      if (existing) {
        throw new Error(
          `Ya existe un producto con el SKU '${dto.sku}'`,
        );
      }
    }

    product.update(dto);

    const updated =
      await this.productRepository.update(product);

    return ProductMapper.toResponse(updated);
  }
}
