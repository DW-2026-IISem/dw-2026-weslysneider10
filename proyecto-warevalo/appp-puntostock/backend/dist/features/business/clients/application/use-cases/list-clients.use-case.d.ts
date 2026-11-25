import { type IClientRepository } from '../../domain/interfaces/client-repository.interface';
import { ClientFilterDto } from '../dto/client-filter.dto';
export declare class ListClientsUseCase {
    private readonly clientRepository;
    constructor(clientRepository: IClientRepository);
    execute(filter: ClientFilterDto): Promise<{
        items: import("../dto/client-response.dto").ClientResponseDto[];
        meta: import("../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
}
