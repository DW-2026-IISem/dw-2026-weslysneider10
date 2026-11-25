import { Product } from '../../../domain/entities/product.entity';
import { IProductRepository, ProductFindAllParams } from '../../../domain/interfaces/product-repository.interface';
export declare class ProductRepository implements IProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Product | null>;
    findBySku(sku: string): Promise<Product | null>;
    findAll(params: ProductFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Product>>;
}
