"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidReceiptQuantityException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InvalidReceiptQuantityException extends domain_exception_1.DomainException {
    constructor(productName, ordered, received) {
        super(`La cantidad recibida (${received}) para '${productName}' no puede superar la cantidad pedida (${ordered})`);
    }
}
exports.InvalidReceiptQuantityException = InvalidReceiptQuantityException;
//# sourceMappingURL=invalid-receipt-quantity.exception.js.map