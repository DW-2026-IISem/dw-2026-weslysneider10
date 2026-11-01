"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReturnResponse = toReturnResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toReturnResponse(ret) {
    return ret.toJSON();
}
//# sourceMappingURL=return-response.dto.js.map