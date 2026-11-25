import { CreateClientDto } from '../../../application/dto/create-client.dto';
import { UpdateClientDto } from '../../../application/dto/update-client.dto';
import { ClientFilterDto } from '../../../application/dto/client-filter.dto';
import { ClientResponseDto } from '../../../application/dto/client-response.dto';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case';
import { UpdateClientUseCase } from '../../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/delete-client.use-case';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case';
import { ListClientsUseCase } from '../../../application/use-cases/list-clients.use-case';
export declare class ClientsController {
    private readonly createClientUseCase;
    private readonly updateClientUseCase;
    private readonly deleteClientUseCase;
    private readonly getClientUseCase;
    private readonly listClientsUseCase;
    constructor(createClientUseCase: CreateClientUseCase, updateClientUseCase: UpdateClientUseCase, deleteClientUseCase: DeleteClientUseCase, getClientUseCase: GetClientUseCase, listClientsUseCase: ListClientsUseCase);
    create(dto: CreateClientDto): Promise<ClientResponseDto>;
    findAll(filter: ClientFilterDto): Promise<{
        items: ClientResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<ClientResponseDto>;
    update(id: number, dto: UpdateClientDto): Promise<ClientResponseDto>;
    remove(id: number): Promise<void>;
}
