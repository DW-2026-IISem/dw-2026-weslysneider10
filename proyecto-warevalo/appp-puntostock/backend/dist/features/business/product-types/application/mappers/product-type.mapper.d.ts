import { ProductType } from '../../domain/entities/product-type.entity';
import { ProductTypeResponseDto } from '../dto/product-type-response.dto';
import { ProductTypeModel } from '../../infrastructure/persistence/models/product-type.model';
export declare class ProductTypeMapper {
    static toDomain(model: ProductTypeModel): ProductType;
    static toResponse(entity: ProductType): ProductTypeResponseDto;
    static toPersistence(entity: ProductType): Partial<ProductTypeModel>;
}
