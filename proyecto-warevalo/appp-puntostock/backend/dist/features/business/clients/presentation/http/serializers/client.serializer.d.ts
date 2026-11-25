import { Client } from '../../../domain/entities/client.entity';
import { ClientResponseDto } from '../../../application/dto/client-response.dto';
export declare class ClientSerializer {
    static serialize(entity: Client): ClientResponseDto;
}
