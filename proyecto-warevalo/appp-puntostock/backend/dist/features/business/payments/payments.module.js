"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const sales_module_1 = require("../sales/sales.module");
const payment_repository_interface_1 = require("./domain/interfaces/payment-repository.interface");
const payment_repository_1 = require("./infrastructure/persistence/repositories/payment.repository");
const create_payment_use_case_1 = require("./application/use-cases/create-payment.use-case");
const cancel_payment_use_case_1 = require("./application/use-cases/cancel-payment.use-case");
const get_payment_use_case_1 = require("./application/use-cases/get-payment.use-case");
const list_payments_use_case_1 = require("./application/use-cases/list-payments.use-case");
const list_payments_by_sale_use_case_1 = require("./application/use-cases/list-payments-by-sale.use-case");
const payments_controller_1 = require("./presentation/http/controllers/payments.controller");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [sales_module_1.SalesModule],
        controllers: [payments_controller_1.PaymentsController],
        providers: [
            payment_repository_1.PaymentRepository,
            { provide: payment_repository_interface_1.PAYMENT_REPOSITORY, useExisting: payment_repository_1.PaymentRepository },
            create_payment_use_case_1.CreatePaymentUseCase,
            cancel_payment_use_case_1.CancelPaymentUseCase,
            get_payment_use_case_1.GetPaymentUseCase,
            list_payments_use_case_1.ListPaymentsUseCase,
            list_payments_by_sale_use_case_1.ListPaymentsBySaleUseCase,
        ],
        exports: [payment_repository_interface_1.PAYMENT_REPOSITORY],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map