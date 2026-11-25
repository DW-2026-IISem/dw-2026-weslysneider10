import { Product } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductModel } from '../../infrastructure/persistence/models/product.model';
export declare class ProductMapper {
    static toDomain(model: ProductModel): Product;
    static toResponse(entity: Product): ProductResponseDto;
    static toPersistence(entity: Product): Partial<ProductModel>;
}
