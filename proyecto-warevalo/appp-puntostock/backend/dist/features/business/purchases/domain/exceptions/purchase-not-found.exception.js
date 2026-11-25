"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class PurchaseNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Compra', id);
    }
}
exports.PurchaseNotFoundException = PurchaseNotFoundException;
//# sourceMappingURL=purchase-not-found.exception.js.map