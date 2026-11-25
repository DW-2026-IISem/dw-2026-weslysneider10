import { ProductType } from '../../../domain/entities/product-type.entity';
import { ProductTypeResponseDto } from '../../../application/dto/product-type-response.dto';
export declare class ProductTypeSerializer {
    static serialize(entity: ProductType): ProductTypeResponseDto;
}
