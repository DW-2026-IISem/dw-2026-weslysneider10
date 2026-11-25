"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseMapper = void 0;
const purchase_entity_1 = require("../../domain/entities/purchase.entity");
class PurchaseMapper {
    static toDomain(purchaseModel, detailModels) {
        const items = detailModels.map((detail) => purchase_entity_1.PurchaseItem.reconstitute({
            id: detail.id,
            purchaseId: detail.purchaseId,
            productId: detail.productId,
            quantityOrdered: detail.quantityOrdered,
            quantityReceived: detail.quantityReceived,
            unitCost: Number(detail.unitCost),
            total: Number(detail.total),
        }));
        return purchase_entity_1.Purchase.reconstitute({
            id: purchaseModel.id,
            purchaseDate: purchaseModel.purchaseDate,
            supplierId: purchaseModel.supplierId,
            branchId: purchaseModel.branchId,
            status: purchaseModel.status,
            subtotal: Number(purchaseModel.subtotal),
            tax: Number(purchaseModel.tax),
            total: Number(purchaseModel.total),
            items,
            createdAt: purchaseModel.createdAt,
            updatedAt: purchaseModel.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            purchaseDate: entity.purchaseDate,
            supplierId: entity.supplierId,
            branchId: entity.branchId,
            status: entity.status,
            subtotal: entity.subtotal,
            tax: entity.tax,
            total: entity.total,
            items: entity.items.map((item) => PurchaseMapper.toItemResponse(item)),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toItemResponse(item) {
        return {
            id: item.id,
            productId: item.productId,
            quantityOrdered: item.quantityOrdered,
            quantityReceived: item.quantityReceived,
            unitCost: item.unitCost,
            total: item.total,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            purchaseDate: entity.purchaseDate,
            supplierId: entity.supplierId,
            branchId: entity.branchId,
            status: entity.status ?? purchase_entity_1.PurchaseStatus.PENDING,
            subtotal: entity.subtotal,
            tax: entity.tax,
            total: entity.total,
        };
    }
}
exports.PurchaseMapper = PurchaseMapper;
//# sourceMappingURL=purchase.mapper.js.map