import { ProductType } from '../../../domain/entities/product-type.entity';

import { ProductTypeResponseDto } from '../../../application/dto/product-type-response.dto';

import { ProductTypeMapper } from '../../../application/mappers/product-type.mapper';

export class ProductTypeSerializer {
  static serialize(
    entity: ProductType,
  ): ProductTypeResponseDto {
    return ProductTypeMapper.toResponse(entity);
  }
}
