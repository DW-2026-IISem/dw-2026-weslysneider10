import { IProductTypeRepository } from '../../domain/interfaces/product-type-repository.interface';
import { ProductTypeFilterDto } from '../dto/product-type-filter.dto';
export declare class ListProductTypesUseCase {
    private readonly productTypeRepository;
    constructor(productTypeRepository: IProductTypeRepository);
    execute(filter: ProductTypeFilterDto): Promise<{
        items: import("../dto/product-type-response.dto").ProductTypeResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
