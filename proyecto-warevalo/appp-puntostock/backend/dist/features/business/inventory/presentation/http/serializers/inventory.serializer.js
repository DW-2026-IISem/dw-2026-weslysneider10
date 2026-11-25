"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventorySerializer = void 0;
const inventory_mapper_1 = require("../../../application/mappers/inventory.mapper");
class InventorySerializer {
    static serialize(entity) {
        return inventory_mapper_1.InventoryMapper.toResponse(entity);
    }
}
exports.InventorySerializer = InventorySerializer;
//# sourceMappingURL=inventory.serializer.js.map