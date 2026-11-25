import { type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
export declare class GetReturnUseCase {
    private readonly returnRepository;
    constructor(returnRepository: IReturnRepository);
    execute(id: number): Promise<import("../dto/return-response.dto").ReturnResponseDto>;
}
