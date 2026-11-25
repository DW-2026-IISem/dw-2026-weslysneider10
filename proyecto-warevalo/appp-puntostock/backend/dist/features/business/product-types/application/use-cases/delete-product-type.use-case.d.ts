import { IProductTypeRepository } from '../../domain/interfaces/product-type-repository.interface';
export declare class DeleteProductTypeUseCase {
    private readonly productTypeRepository;
    constructor(productTypeRepository: IProductTypeRepository);
    execute(id: number): Promise<void>;
}
