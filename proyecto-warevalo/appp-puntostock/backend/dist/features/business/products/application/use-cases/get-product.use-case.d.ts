import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
export declare class GetProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<import("../dto/product-response.dto").ProductResponseDto>;
}
