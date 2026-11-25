"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchSerializer = void 0;
const branch_mapper_1 = require("../../../application/mappers/branch.mapper");
class BranchSerializer {
    static serialize(entity) {
        return branch_mapper_1.BranchMapper.toResponse(entity);
    }
}
exports.BranchSerializer = BranchSerializer;
//# sourceMappingURL=branch.serializer.js.map