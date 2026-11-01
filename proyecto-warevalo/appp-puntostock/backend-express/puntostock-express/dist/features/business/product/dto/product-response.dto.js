"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductResponse = toProductResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toProductResponse(product) {
    return product.toJSON();
}
//# sourceMappingURL=product-response.dto.js.map