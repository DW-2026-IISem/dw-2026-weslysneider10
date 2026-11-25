"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierNitAlreadyExistsException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class SupplierNitAlreadyExistsException extends domain_exception_1.DomainException {
    constructor(nit) {
        super(`El NIT '${nit}' ya está registrado`);
    }
}
exports.SupplierNitAlreadyExistsException = SupplierNitAlreadyExistsException;
//# sourceMappingURL=supplier-nit-already-exists.exception.js.map