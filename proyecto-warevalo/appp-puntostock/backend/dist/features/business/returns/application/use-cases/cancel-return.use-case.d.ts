import { type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
export declare class CancelReturnUseCase {
    private readonly returnRepository;
    private readonly productRepository;
    constructor(returnRepository: IReturnRepository, productRepository: IProductRepository);
    execute(id: number): Promise<import("../dto/return-response.dto").ReturnResponseDto>;
}
