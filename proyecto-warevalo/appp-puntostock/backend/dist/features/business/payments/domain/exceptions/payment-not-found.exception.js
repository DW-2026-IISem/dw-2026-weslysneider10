"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class PaymentNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Pago', id);
    }
}
exports.PaymentNotFoundException = PaymentNotFoundException;
//# sourceMappingURL=payment-not-found.exception.js.map