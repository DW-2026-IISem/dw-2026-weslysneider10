import { Inventory } from '../../domain/entities/inventory.entity';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { InventoryModel } from '../../infrastructure/persistence/models/inventory.model';
export declare class InventoryMapper {
    static toDomain(model: InventoryModel): Inventory;
    static toResponse(entity: Inventory): InventoryResponseDto;
    static toPersistence(entity: Inventory): Partial<InventoryModel>;
}
