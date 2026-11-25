"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleMapper = void 0;
const status_enum_1 = require("../../../../../common/enums/status.enum");
const sale_entity_1 = require("../../domain/entities/sale.entity");
class SaleMapper {
    static toDomain(saleModel, itemModels) {
        const items = itemModels.map((item) => sale_entity_1.SaleItem.reconstitute({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            total: Number(item.total),
            saleId: item.saleId,
        }));
        return sale_entity_1.Sale.reconstitute({
            id: saleModel.id,
            saleDate: saleModel.saleDate,
            subtotal: Number(saleModel.subtotal),
            tax: Number(saleModel.tax),
            discounts: Number(saleModel.discounts),
            total: Number(saleModel.total),
            status: saleModel.status,
            clientId: saleModel.clientId,
            items,
            createdAt: saleModel.createdAt,
            updatedAt: saleModel.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            saleDate: entity.saleDate,
            subtotal: entity.subtotal,
            tax: entity.tax,
            discounts: entity.discounts,
            total: entity.total,
            status: entity.status,
            clientId: entity.clientId,
            items: entity.items.map((item) => SaleMapper.toItemResponse(item)),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toItemResponse(item) {
        return {
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            saleDate: entity.saleDate,
            subtotal: entity.subtotal,
            tax: entity.tax,
            discounts: entity.discounts,
            total: entity.total,
            status: entity.status ?? status_enum_1.Status.ACTIVE,
            clientId: entity.clientId,
        };
    }
}
exports.SaleMapper = SaleMapper;
//# sourceMappingURL=sale.mapper.js.map