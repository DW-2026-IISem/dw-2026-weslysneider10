"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPurchaseStatusException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InvalidPurchaseStatusException extends domain_exception_1.DomainException {
    constructor(currentStatus, action) {
        super(`No se puede ${action} una compra en estado '${currentStatus}'`);
    }
}
exports.InvalidPurchaseStatusException = InvalidPurchaseStatusException;
//# sourceMappingURL=invalid-purchase-status.exception.js.map