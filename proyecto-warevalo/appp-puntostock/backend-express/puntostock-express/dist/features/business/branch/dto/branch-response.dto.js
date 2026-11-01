"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBranchResponse = toBranchResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
function toBranchResponse(branch) {
    return branch.toJSON();
}
//# sourceMappingURL=branch-response.dto.js.map