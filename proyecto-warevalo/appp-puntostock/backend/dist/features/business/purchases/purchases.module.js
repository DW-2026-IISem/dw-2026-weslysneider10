"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const suppliers_module_1 = require("../suppliers/suppliers.module");
const branches_module_1 = require("../branches/branches.module");
const products_module_1 = require("../products/products.module");
const inventories_module_1 = require("../inventory/inventories.module");
const purchase_repository_interface_1 = require("./domain/interfaces/purchase-repository.interface");
const purchase_repository_1 = require("./infrastructure/persistence/repositories/purchase.repository");
const create_purchase_use_case_1 = require("./application/use-cases/create-purchase.use-case");
const receive_purchase_use_case_1 = require("./application/use-cases/receive-purchase.use-case");
const cancel_purchase_use_case_1 = require("./application/use-cases/cancel-purchase.use-case");
const get_purchase_use_case_1 = require("./application/use-cases/get-purchase.use-case");
const list_purchases_use_case_1 = require("./application/use-cases/list-purchases.use-case");
const purchases_controller_1 = require("./presentation/http/controllers/purchases.controller");
let PurchasesModule = class PurchasesModule {
};
exports.PurchasesModule = PurchasesModule;
exports.PurchasesModule = PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [suppliers_module_1.SuppliersModule, branches_module_1.BranchesModule, products_module_1.ProductsModule, inventories_module_1.InventoriesModule],
        controllers: [purchases_controller_1.PurchasesController],
        providers: [
            purchase_repository_1.PurchaseRepository,
            { provide: purchase_repository_interface_1.PURCHASE_REPOSITORY, useExisting: purchase_repository_1.PurchaseRepository },
            create_purchase_use_case_1.CreatePurchaseUseCase,
            receive_purchase_use_case_1.ReceivePurchaseUseCase,
            cancel_purchase_use_case_1.CancelPurchaseUseCase,
            get_purchase_use_case_1.GetPurchaseUseCase,
            list_purchases_use_case_1.ListPurchasesUseCase,
        ],
        exports: [purchase_repository_interface_1.PURCHASE_REPOSITORY],
    })
], PurchasesModule);
//# sourceMappingURL=purchases.module.js.map