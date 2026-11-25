"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidReturnQuantityException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InvalidReturnQuantityException extends domain_exception_1.DomainException {
    constructor(productName, sold, alreadyReturned, requested) {
        super(`No se puede devolver ${requested} unidad(es) de '${productName}': vendidas ${sold}, ya devueltas ${alreadyReturned}`);
    }
}
exports.InvalidReturnQuantityException = InvalidReturnQuantityException;
//# sourceMappingURL=invalid-return-quantity.exception.js.map