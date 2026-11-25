import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { UpdateProductDto } from '../dto/update-product.dto';
export declare class UpdateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number, dto: UpdateProductDto): Promise<import("../dto/product-response.dto").ProductResponseDto>;
}
