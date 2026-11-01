"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPaymentResponse = toPaymentResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toPaymentResponse(payment) {
    return payment.toJSON();
}
//# sourceMappingURL=payment-response.dto.js.map