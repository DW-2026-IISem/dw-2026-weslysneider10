"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSerializer = void 0;
const payment_mapper_1 = require("../../../application/mappers/payment.mapper");
class PaymentSerializer {
    static serialize(entity) {
        return payment_mapper_1.PaymentMapper.toResponse(entity);
    }
}
exports.PaymentSerializer = PaymentSerializer;
//# sourceMappingURL=payment.serializer.js.map