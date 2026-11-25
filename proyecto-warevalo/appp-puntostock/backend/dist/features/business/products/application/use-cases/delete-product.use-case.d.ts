import { IProductRepository } from '../../domain/interfaces/product-repository.interface';
export declare class DeleteProductUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(id: number): Promise<void>;
}
