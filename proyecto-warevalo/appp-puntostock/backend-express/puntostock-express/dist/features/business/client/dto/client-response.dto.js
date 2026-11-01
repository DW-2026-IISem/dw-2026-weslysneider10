"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClientResponse = toClientResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toClientResponse(client) {
    return client.toJSON();
}
//# sourceMappingURL=client-response.dto.js.map