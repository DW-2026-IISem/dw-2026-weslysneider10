"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPurchaseResponse = toPurchaseResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toPurchaseResponse(purchase) {
    return purchase.toJSON();
}
//# sourceMappingURL=purchase-response.dto.js.map