import { type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
export declare class ListReturnsBySaleUseCase {
    private readonly returnRepository;
    constructor(returnRepository: IReturnRepository);
    execute(saleId: number): Promise<import("../dto/return-response.dto").ReturnResponseDto[]>;
}
