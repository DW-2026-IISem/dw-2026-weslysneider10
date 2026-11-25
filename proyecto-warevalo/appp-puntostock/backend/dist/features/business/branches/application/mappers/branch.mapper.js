"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchMapper = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const branch_entity_1 = require("../../domain/entities/branch.entity");
class BranchMapper {
    static toDomain(model) {
        return branch_entity_1.Branch.reconstitute({
            id: model.id,
            name: model.name,
            description: model.description ?? undefined,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description ?? null,
            status: entity.status ?? status_enum_1.Status.ACTIVE,
        };
    }
}
exports.BranchMapper = BranchMapper;
//# sourceMappingURL=branch.mapper.js.map