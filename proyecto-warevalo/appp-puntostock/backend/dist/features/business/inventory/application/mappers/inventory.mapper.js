"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMapper = void 0;
const inventory_entity_1 = require("../../domain/entities/inventory.entity");
class InventoryMapper {
    static toDomain(model) {
        return inventory_entity_1.Inventory.reconstitute({
            id: model.id,
            branchId: model.branchId,
            productId: model.productId,
            quantity: model.quantity,
            minStock: model.minStock,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            branchId: entity.branchId,
            productId: entity.productId,
            quantity: entity.quantity,
            minStock: entity.minStock,
            isLowStock: entity.isLowStock(),
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            branchId: entity.branchId,
            productId: entity.productId,
            quantity: entity.quantity,
            minStock: entity.minStock,
        };
    }
}
exports.InventoryMapper = InventoryMapper;
//# sourceMappingURL=inventory.mapper.js.map