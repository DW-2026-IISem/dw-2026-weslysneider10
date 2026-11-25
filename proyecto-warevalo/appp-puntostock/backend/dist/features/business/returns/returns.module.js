"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsModule = void 0;
const common_1 = require("@nestjs/common");
const sales_module_1 = require("../sales/sales.module");
const products_module_1 = require("../products/products.module");
const return_repository_interface_1 = require("./domain/interfaces/return-repository.interface");
const return_repository_1 = require("./infrastructure/persistence/repositories/return.repository");
const create_return_use_case_1 = require("./application/use-cases/create-return.use-case");
const cancel_return_use_case_1 = require("./application/use-cases/cancel-return.use-case");
const get_return_use_case_1 = require("./application/use-cases/get-return.use-case");
const list_returns_use_case_1 = require("./application/use-cases/list-returns.use-case");
const list_returns_by_sale_use_case_1 = require("./application/use-cases/list-returns-by-sale.use-case");
const returns_controller_1 = require("./presentation/http/controllers/returns.controller");
let ReturnsModule = class ReturnsModule {
};
exports.ReturnsModule = ReturnsModule;
exports.ReturnsModule = ReturnsModule = __decorate([
    (0, common_1.Module)({
        imports: [sales_module_1.SalesModule, products_module_1.ProductsModule],
        controllers: [returns_controller_1.ReturnsController],
        providers: [
            return_repository_1.ReturnRepository,
            { provide: return_repository_interface_1.RETURN_REPOSITORY, useExisting: return_repository_1.ReturnRepository },
            create_return_use_case_1.CreateReturnUseCase,
            cancel_return_use_case_1.CancelReturnUseCase,
            get_return_use_case_1.GetReturnUseCase,
            list_returns_use_case_1.ListReturnsUseCase,
            list_returns_by_sale_use_case_1.ListReturnsBySaleUseCase,
        ],
        exports: [return_repository_interface_1.RETURN_REPOSITORY],
    })
], ReturnsModule);
//# sourceMappingURL=returns.module.js.map