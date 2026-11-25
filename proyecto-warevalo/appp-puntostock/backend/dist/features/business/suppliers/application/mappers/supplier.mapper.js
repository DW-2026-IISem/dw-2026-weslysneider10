"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierMapper = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const supplier_entity_1 = require("../../domain/entities/supplier.entity");
class SupplierMapper {
    static toDomain(model) {
        return supplier_entity_1.Supplier.reconstitute({
            id: model.id,
            nit: model.nit,
            businessName: model.businessName,
            contactName: model.contactName ?? undefined,
            phone: model.phone ?? undefined,
            email: model.email ?? undefined,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            nit: entity.nit,
            businessName: entity.businessName,
            contactName: entity.contactName,
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
            nit: entity.nit,
            businessName: entity.businessName,
            contactName: entity.contactName ?? null,
            phone: entity.phone ?? null,
            email: entity.email ?? null,
            status: entity.status ?? status_enum_1.Status.ACTIVE,
        };
    }
}
exports.SupplierMapper = SupplierMapper;
//# sourceMappingURL=supplier.mapper.js.map