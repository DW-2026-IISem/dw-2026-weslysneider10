"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryAlreadyExistsException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InventoryAlreadyExistsException extends domain_exception_1.DomainException {
    constructor(branchId, productId) {
        super(`Ya existe un registro de inventario para la sucursal '${branchId}' y el producto '${productId}'`);
    }
}
exports.InventoryAlreadyExistsException = InventoryAlreadyExistsException;
//# sourceMappingURL=inventory-already-exists.exception.js.map