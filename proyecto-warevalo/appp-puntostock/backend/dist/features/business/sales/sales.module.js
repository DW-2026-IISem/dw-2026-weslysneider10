"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const sale_repository_interface_1 = require("./domain/interfaces/sale-repository.interface");
const sale_repository_1 = require("./infrastructure/persistence/repositories/sale.repository");
const sale_calculator_domain_service_1 = require("./domain/services/sale-calculator.domain-service");
const create_sale_use_case_1 = require("./application/use-cases/create-sale.use-case");
const get_sale_use_case_1 = require("./application/use-cases/get-sale.use-case");
const list_sales_use_case_1 = require("./application/use-cases/list-sales.use-case");
const cancel_sale_use_case_1 = require("./application/use-cases/cancel-sale.use-case");
const sales_controller_1 = require("./presentation/http/controllers/sales.controller");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            sales_controller_1.SalesController,
        ],
        providers: [
            sale_repository_1.SaleRepository,
            {
                provide: sale_repository_interface_1.SALE_REPOSITORY,
                useExisting: sale_repository_1.SaleRepository,
            },
            sale_calculator_domain_service_1.SaleCalculatorDomainService,
            create_sale_use_case_1.CreateSaleUseCase,
            get_sale_use_case_1.GetSaleUseCase,
            list_sales_use_case_1.ListSalesUseCase,
            cancel_sale_use_case_1.CancelSaleUseCase,
        ],
        exports: [
            sale_repository_interface_1.SALE_REPOSITORY,
        ],
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map