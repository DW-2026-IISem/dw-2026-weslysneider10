"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientStockException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class InsufficientStockException extends domain_exception_1.DomainException {
    constructor(productName, available, requested) {
        super(`Stock insuficiente para '${productName}': disponible ${available}, solicitado ${requested}`);
    }
}
exports.InsufficientStockException = InsufficientStockException;
//# sourceMappingURL=insufficient-stock.exception.js.map