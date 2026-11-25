import { CreateProductUseCase } from '../../../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../../application/use-cases/delete-product.use-case';
import { GetProductUseCase } from '../../../application/use-cases/get-product.use-case';
import { ListProductsUseCase } from '../../../application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../../../application/use-cases/update-product.use-case';
import { CreateProductDto } from '../../../application/dto/create-product.dto';
import { ProductFilterDto } from '../../../application/dto/product-filter.dto';
import { ProductResponseDto } from '../../../application/dto/product-response.dto';
import { UpdateProductDto } from '../../../application/dto/update-product.dto';
export declare class ProductsController {
    private readonly createProductUseCase;
    private readonly getProductUseCase;
    private readonly listProductsUseCase;
    private readonly updateProductUseCase;
    private readonly deleteProductUseCase;
    constructor(createProductUseCase: CreateProductUseCase, getProductUseCase: GetProductUseCase, listProductsUseCase: ListProductsUseCase, updateProductUseCase: UpdateProductUseCase, deleteProductUseCase: DeleteProductUseCase);
    create(dto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(filters: ProductFilterDto): Promise<{
        items: ProductResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: string): Promise<ProductResponseDto>;
    update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: string): Promise<void>;
}
