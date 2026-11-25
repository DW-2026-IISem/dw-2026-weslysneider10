import { Client } from '../../domain/entities/client.entity';
import { ClientResponseDto } from '../dto/client-response.dto';
import { ClientModel } from '../../infrastructure/persistence/models/client.model';
export declare class ClientMapper {
    static toDomain(model: ClientModel): Client;
    static toResponse(entity: Client): ClientResponseDto;
    static toPersistence(entity: Client): Partial<ClientModel>;
}
