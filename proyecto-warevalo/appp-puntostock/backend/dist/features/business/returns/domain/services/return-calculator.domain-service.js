"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnCalculatorDomainService = void 0;
class ReturnCalculatorDomainService {
    calculateSubtotal(lines) {
        return lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
    }
    calculateTotals(lines) {
        const subtotal = this.calculateSubtotal(lines);
        return { subtotal, total: subtotal };
    }
}
exports.ReturnCalculatorDomainService = ReturnCalculatorDomainService;
//# sourceMappingURL=return-calculator.domain-service.js.map