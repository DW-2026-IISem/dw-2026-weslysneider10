"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSupplierResponse = toSupplierResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toSupplierResponse(supplier) {
    return supplier.toJSON();
}
//# sourceMappingURL=supplier-response.dto.js.map