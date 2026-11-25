"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseCalculatorDomainService = void 0;
class PurchaseCalculatorDomainService {
    calculateSubtotal(items) {
        return items.reduce((sum, item) => sum + item.quantityOrdered * item.unitCost, 0);
    }
    calculateTotals(items, tax = 0) {
        const subtotal = this.calculateSubtotal(items);
        const total = subtotal + tax;
        return { subtotal, tax, total };
    }
}
exports.PurchaseCalculatorDomainService = PurchaseCalculatorDomainService;
//# sourceMappingURL=purchase-calculator.domain-service.js.map