import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface';
import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
  sku?: string;
  isActive?: boolean;
}

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(
    params: ProductFindAllParams,
  ): Promise<PaginatedResult<Product>>;
}
