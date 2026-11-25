import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
import { CreateProductDto } from '../dto/create-product.dto';
export declare class CreateProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(dto: CreateProductDto): Promise<import("../dto/product-response.dto").ProductResponseDto>;
}
