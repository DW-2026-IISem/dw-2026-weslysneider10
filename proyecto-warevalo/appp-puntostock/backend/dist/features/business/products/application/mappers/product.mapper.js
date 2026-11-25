"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const product_entity_1 = require("../../domain/entities/product.entity");
class ProductMapper {
    static toDomain(model) {
        return product_entity_1.Product.reconstitute({
            id: model.id,
            sku: model.sku,
            name: model.name,
            description: model.description ?? undefined,
            price: Number(model.price),
            isActive: model.isActive,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            sku: entity.sku,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            sku: entity.sku,
            name: entity.name,
            description: entity.description ?? null,
            price: entity.price,
            isActive: entity.isActive,
        };
    }
}
exports.ProductMapper = ProductMapper;
//# sourceMappingURL=product.mapper.js.map