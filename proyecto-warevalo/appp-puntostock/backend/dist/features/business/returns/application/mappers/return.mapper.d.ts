import { Return, ReturnLine } from '../../domain/entities/return.entity';
import { ReturnLineResponseDto, ReturnResponseDto } from '../dto/return-response.dto';
import { ReturnModel } from '../../infrastructure/persistence/models/return.model';
import { ReturnDetailModel } from '../../infrastructure/persistence/models/return-detail.model';
export declare class ReturnMapper {
    static toDomain(returnModel: ReturnModel, detailModels: ReturnDetailModel[]): Return;
    static toResponse(entity: Return): ReturnResponseDto;
    static toLineResponse(line: ReturnLine): ReturnLineResponseDto;
    static toPersistence(entity: Return): Partial<ReturnModel>;
}
