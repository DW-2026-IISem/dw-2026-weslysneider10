import { type ISaleRepository } from '../../../sales/domain/interfaces/sale-repository.interface';
import { type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { CreateReturnDto } from '../dto/create-return.dto';
export declare class CreateReturnUseCase {
    private readonly returnRepository;
    private readonly saleRepository;
    private readonly productRepository;
    private readonly returnCalculator;
    constructor(returnRepository: IReturnRepository, saleRepository: ISaleRepository, productRepository: IProductRepository);
    execute(dto: CreateReturnDto): Promise<import("../dto/return-response.dto").ReturnResponseDto>;
}
