"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class ProductNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Producto', id);
    }
}
exports.ProductNotFoundException = ProductNotFoundException;
//# sourceMappingURL=product-not-found.exception.js.map