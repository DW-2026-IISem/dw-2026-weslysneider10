"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class ProductTypeNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Tipo de producto', id);
    }
}
exports.ProductTypeNotFoundException = ProductTypeNotFoundException;
//# sourceMappingURL=product-type-not-found.exception.js.map