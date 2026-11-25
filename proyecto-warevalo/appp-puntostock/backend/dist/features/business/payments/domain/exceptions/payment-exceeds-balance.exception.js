"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentExceedsBalanceException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class PaymentExceedsBalanceException extends domain_exception_1.DomainException {
    constructor(saleId, balance) {
        super(`El monto del pago supera el saldo pendiente (${balance}) de la venta ${saleId}`);
    }
}
exports.PaymentExceedsBalanceException = PaymentExceedsBalanceException;
//# sourceMappingURL=payment-exceeds-balance.exception.js.map