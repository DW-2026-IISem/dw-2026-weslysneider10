import { Inventory } from '../../../domain/entities/inventory.entity';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto';
import { InventoryMapper } from '../../../application/mappers/inventory.mapper';

export class InventorySerializer {
  static serialize(entity: Inventory): InventoryResponseDto {
    return InventoryMapper.toResponse(entity);
  }
}
