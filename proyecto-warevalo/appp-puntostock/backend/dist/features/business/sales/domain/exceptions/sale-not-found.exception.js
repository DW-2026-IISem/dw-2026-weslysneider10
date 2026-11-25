"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class SaleNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Venta', id);
    }
}
exports.SaleNotFoundException = SaleNotFoundException;
//# sourceMappingURL=sale-not-found.exception.js.map