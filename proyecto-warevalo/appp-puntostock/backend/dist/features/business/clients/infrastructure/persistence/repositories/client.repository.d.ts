import { Client } from '../../../domain/entities/client.entity';
import { ClientFindAllParams, IClientRepository } from '../../../domain/interfaces/client-repository.interface';
export declare class ClientRepository implements IClientRepository {
    create(client: Client): Promise<Client>;
    update(client: Client): Promise<Client>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findAll(params: ClientFindAllParams): Promise<import("../../../../../../common/interfaces/pagination.interface").PaginatedResult<Client>>;
}
