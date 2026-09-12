import { Inventory } from '../../domain/entities/inventory.entity';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { InventoryModel } from '../../infrastructure/persistence/models/inventory.model';

export class InventoryMapper {
  static toDomain(model: InventoryModel): Inventory {
    return Inventory.reconstitute({
      id: model.id,
      branchId: model.branchId,
      productId: model.productId,
      quantity: model.quantity,
      minStock: model.minStock,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: Inventory): InventoryResponseDto {
    return {
      id: entity.id!,
      branchId: entity.branchId,
      productId: entity.productId,
      quantity: entity.quantity,
      minStock: entity.minStock,
      isLowStock: entity.isLowStock(),
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Inventory): Partial<InventoryModel> {
    return {
      id: entity.id,
      branchId: entity.branchId,
      productId: entity.productId,
      quantity: entity.quantity,
      minStock: entity.minStock,
    };
  }
}
