import { Inventory } from '../../../domain/entities/inventory.entity';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto';
export declare class InventorySerializer {
    static serialize(entity: Inventory): InventoryResponseDto;
}
