"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMapper = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const client_entity_1 = require("../../domain/entities/client.entity");
class ClientMapper {
    static toDomain(model) {
        return client_entity_1.Client.reconstitute({
            id: model.id,
            name: model.name,
            address: model.address ?? undefined,
            phone: model.phone ?? undefined,
            email: model.email ?? undefined,
            password: model.password ?? undefined,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            name: entity.name,
            address: entity.address,
            phone: entity.phone,
            email: entity.email,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            name: entity.name,
            address: entity.address ?? null,
            phone: entity.phone ?? null,
            email: entity.email ?? null,
            password: entity.password ?? null,
            status: entity.status ?? status_enum_1.Status.ACTIVE,
        };
    }
}
exports.ClientMapper = ClientMapper;
//# sourceMappingURL=client.mapper.js.map