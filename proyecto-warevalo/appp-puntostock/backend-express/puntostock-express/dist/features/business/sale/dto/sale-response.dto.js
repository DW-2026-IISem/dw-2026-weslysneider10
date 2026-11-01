"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSaleResponse = toSaleResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toSaleResponse(sale) {
    return sale.toJSON();
}
//# sourceMappingURL=sale-response.dto.js.map