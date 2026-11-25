import { IProductTypeRepository } from '../../domain/interfaces/product-type-repository.interface';
import { CreateProductTypeDto } from '../dto/create-product-type.dto';
export declare class CreateProductTypeUseCase {
    private readonly productTypeRepository;
    constructor(productTypeRepository: IProductTypeRepository);
    execute(dto: CreateProductTypeDto): Promise<import("../dto/product-type-response.dto").ProductTypeResponseDto>;
}
