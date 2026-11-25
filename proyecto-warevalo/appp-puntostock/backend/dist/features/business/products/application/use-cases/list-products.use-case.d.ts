import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { ProductFilterDto } from '../dto/product-filter.dto';
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(filter: ProductFilterDto): Promise<{
        items: import("../dto/product-response.dto").ProductResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
