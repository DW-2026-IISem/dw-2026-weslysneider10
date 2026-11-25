import { IProductTypeRepository } from '../../domain/interfaces/product-type-repository.interface';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
export declare class UpdateProductTypeUseCase {
    private readonly productTypeRepository;
    constructor(productTypeRepository: IProductTypeRepository);
    execute(id: number, dto: UpdateProductTypeDto): Promise<import("../dto/product-type-response.dto").ProductTypeResponseDto>;
}
