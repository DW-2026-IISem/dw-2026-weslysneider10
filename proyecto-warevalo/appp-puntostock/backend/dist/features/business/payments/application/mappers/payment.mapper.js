"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMapper = void 0;
const payment_entity_1 = require("../../domain/entities/payment.entity");
class PaymentMapper {
    static toDomain(model) {
        return payment_entity_1.Payment.reconstitute({
            id: model.id,
            referenceType: model.referenceType,
            referenceId: model.referenceId,
            method: model.method,
            amount: model.amount,
            paymentDate: model.paymentDate,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
    static toResponse(entity) {
        return {
            id: entity.id,
            referenceType: entity.referenceType,
            referenceId: entity.referenceId,
            method: entity.method,
            amount: entity.amount,
            paymentDate: entity.paymentDate,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toPersistence(entity) {
        return {
            id: entity.id,
            referenceType: entity.referenceType,
            referenceId: entity.referenceId,
            method: entity.method,
            amount: entity.amount,
            paymentDate: entity.paymentDate,
            status: entity.status,
        };
    }
}
exports.PaymentMapper = PaymentMapper;
//# sourceMappingURL=payment.mapper.js.map