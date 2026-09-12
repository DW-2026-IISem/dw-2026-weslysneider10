import { Product } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductModel } from '../../infrastructure/persistence/models/product.model';

export class ProductMapper {
  static toDomain(model: ProductModel): Product {
    return Product.reconstitute({
      id: model.id,
      sku: model.sku,
      name: model.name,
      description: model.description ?? undefined,
      price: Number(model.price),
      quantity: model.quantity,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Product): ProductResponseDto {
    return {
      id: entity.id!,
      sku: entity.sku,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      quantity: entity.quantity,
      isActive: entity.isActive,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(
    entity: Product,
  ): Partial<ProductModel> {
    return {
      id: entity.id,
      sku: entity.sku,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      quantity: entity.quantity,
      isActive: entity.isActive,
    };
  }
}
