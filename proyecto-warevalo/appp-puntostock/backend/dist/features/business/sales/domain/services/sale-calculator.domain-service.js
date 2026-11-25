"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleCalculatorDomainService = void 0;
const common_1 = require("@nestjs/common");
let SaleCalculatorDomainService = class SaleCalculatorDomainService {
    calculate(props) {
        const subtotal = props.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const tax = props.tax ?? 0;
        const discounts = props.discounts ?? 0;
        const total = subtotal + tax - discounts;
        return {
            subtotal,
            tax,
            discounts,
            total,
        };
    }
};
exports.SaleCalculatorDomainService = SaleCalculatorDomainService;
exports.SaleCalculatorDomainService = SaleCalculatorDomainService = __decorate([
    (0, common_1.Injectable)()
], SaleCalculatorDomainService);
//# sourceMappingURL=sale-calculator.domain-service.js.map