import { ProductType } from '../../../domain/entities/product-type.entity';
import { IProductTypeRepository, ProductTypeFindAllParams } from '../../../domain/interfaces/product-type-repository.interface';
export declare class ProductTypeRepository implements IProductTypeRepository {
    create(productType: ProductType): Promise<ProductType>;
    update(productType: ProductType): Promise<ProductType>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ProductType | null>;
    findAll(params: ProductTypeFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<ProductType>>;
}
