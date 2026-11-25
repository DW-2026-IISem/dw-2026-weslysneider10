"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidProductPriceException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InvalidProductPriceException extends domain_exception_1.DomainException {
    constructor(price) {
        super(`El precio '${price}' debe ser mayor a 0`);
    }
}
exports.InvalidProductPriceException = InvalidProductPriceException;
//# sourceMappingURL=invalid-product-price.exception.js.map