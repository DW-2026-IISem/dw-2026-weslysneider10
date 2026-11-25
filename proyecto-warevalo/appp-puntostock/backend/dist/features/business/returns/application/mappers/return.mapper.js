"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnMapper = void 0;
const return_entity_1 = require("../../domain/entities/return.entity");
const return_status_enum_1 = require("../../domain/enums/return-status.enum");
class ReturnMapper {
    static toDomain(returnModel, detailModels) {
        const lines = detailModels.map((detail) => return_entity_1.ReturnLine.reconstitute({
            id: detail.id,
            returnId: detail.returnId,
            productId: detail.productId,
            quantity: detail.quantity,
            unitPrice: Number(detail.unitPrice),
            total: Number(detail.total),
        }));
        return return_entity_1.Return.reconstitute({
            id: returnModel.id,
            returnDate: returnModel.returnDate,
            reason: returnModel.reason,
            saleId: returnModel.saleId,
            status: returnModel.status,
            subtotal: Number(returnModel.subtotal),
            total: Number(returnModel.total),
            lines,
            createdAt: returnModel.createdAt,
            updatedAt: returnModel.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            returnDate: entity.returnDate,
            reason: entity.reason,
            saleId: entity.saleId,
            status: entity.status,
            subtotal: entity.subtotal,
            total: entity.total,
            lines: entity.lines.map((line) => ReturnMapper.toLineResponse(line)),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toLineResponse(line) {
        return {
            id: line.id,
            productId: line.productId,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            total: line.total,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            returnDate: entity.returnDate,
            reason: entity.reason,
            saleId: entity.saleId,
            status: entity.status ?? return_status_enum_1.ReturnStatus.COMPLETED,
            subtotal: entity.subtotal,
            total: entity.total,
        };
    }
}
exports.ReturnMapper = ReturnMapper;
//# sourceMappingURL=return.mapper.js.map