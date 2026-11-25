"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class InventoryNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Inventario', id);
    }
}
exports.InventoryNotFoundException = InventoryNotFoundException;
//# sourceMappingURL=inventory-not-found.exception.js.map