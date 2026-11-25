import { IProductTypeRepository } from '../../domain/interfaces/product-type-repository.interface';
export declare class GetProductTypeUseCase {
    private readonly productTypeRepository;
    constructor(productTypeRepository: IProductTypeRepository);
    execute(id: number): Promise<import("../dto/product-type-response.dto").ProductTypeResponseDto>;
}
