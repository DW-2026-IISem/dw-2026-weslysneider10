"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class SupplierNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Proveedor', id);
    }
}
exports.SupplierNotFoundException = SupplierNotFoundException;
//# sourceMappingURL=supplier-not-found.exception.js.map