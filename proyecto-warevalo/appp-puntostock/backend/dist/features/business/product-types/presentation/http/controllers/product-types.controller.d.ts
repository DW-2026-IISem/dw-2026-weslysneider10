import { CreateProductTypeDto } from '../../../application/dto/create-product-type.dto';
import { ProductTypeFilterDto } from '../../../application/dto/product-type-filter.dto';
import { ProductTypeResponseDto } from '../../../application/dto/product-type-response.dto';
import { UpdateProductTypeDto } from '../../../application/dto/update-product-type.dto';
import { CreateProductTypeUseCase } from '../../../application/use-cases/create-product-type.use-case';
import { DeleteProductTypeUseCase } from '../../../application/use-cases/delete-product-type.use-case';
import { GetProductTypeUseCase } from '../../../application/use-cases/get-product-type.use-case';
import { ListProductTypesUseCase } from '../../../application/use-cases/list-product-types.use-case';
import { UpdateProductTypeUseCase } from '../../../application/use-cases/update-product-type.use-case';
export declare class ProductTypesController {
    private readonly createProductTypeUseCase;
    private readonly updateProductTypeUseCase;
    private readonly deleteProductTypeUseCase;
    private readonly getProductTypeUseCase;
    private readonly listProductTypesUseCase;
    constructor(createProductTypeUseCase: CreateProductTypeUseCase, updateProductTypeUseCase: UpdateProductTypeUseCase, deleteProductTypeUseCase: DeleteProductTypeUseCase, getProductTypeUseCase: GetProductTypeUseCase, listProductTypesUseCase: ListProductTypesUseCase);
    create(dto: CreateProductTypeDto): Promise<ProductTypeResponseDto>;
    findAll(filter: ProductTypeFilterDto): Promise<{
        items: ProductTypeResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<ProductTypeResponseDto>;
    update(id: number, dto: UpdateProductTypeDto): Promise<ProductTypeResponseDto>;
    remove(id: number): Promise<void>;
}
