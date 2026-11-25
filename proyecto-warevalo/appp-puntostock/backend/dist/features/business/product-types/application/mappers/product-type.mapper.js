"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeMapper = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const product_type_entity_1 = require("../../domain/entities/product-type.entity");
class ProductTypeMapper {
    static toDomain(model) {
        return product_type_entity_1.ProductType.reconstitute({
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
            ...(entity.id !== undefined
                ? { id: entity.id }
                : {}),
            name: entity.name,
            description: entity.description ?? null,
            status: entity.status ?? status_enum_1.Status.ACTIVE,
        };
    }
}
exports.ProductTypeMapper = ProductTypeMapper;
//# sourceMappingURL=product-type.mapper.js.map