"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInventoryResponse = toInventoryResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toInventoryResponse(inventory) {
    return inventory.toJSON();
}
//# sourceMappingURL=inventory-response.dto.js.map