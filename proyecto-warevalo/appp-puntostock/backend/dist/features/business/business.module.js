"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessModule = void 0;
const common_1 = require("@nestjs/common");
const clients_module_1 = require("./clients/clients.module");
const product_types_module_1 = require("./product-types/product-types.module");
const products_module_1 = require("./products/products.module");
const sales_module_1 = require("./sales/sales.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const branches_module_1 = require("./branches/branches.module");
const inventories_module_1 = require("./inventory/inventories.module");
const purchases_module_1 = require("./purchases/purchases.module");
const returns_module_1 = require("./returns/returns.module");
let BusinessModule = class BusinessModule {
};
exports.BusinessModule = BusinessModule;
exports.BusinessModule = BusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [
            clients_module_1.ClientsModule,
            product_types_module_1.ProductTypesModule,
            products_module_1.ProductsModule,
            sales_module_1.SalesModule,
            suppliers_module_1.SuppliersModule,
            branches_module_1.BranchesModule,
            inventories_module_1.InventoriesModule,
            purchases_module_1.PurchasesModule,
            returns_module_1.ReturnsModule,
        ],
        exports: [
            clients_module_1.ClientsModule,
            product_types_module_1.ProductTypesModule,
            products_module_1.ProductsModule,
            sales_module_1.SalesModule,
            suppliers_module_1.SuppliersModule,
            branches_module_1.BranchesModule,
            inventories_module_1.InventoriesModule,
            purchases_module_1.PurchasesModule,
            returns_module_1.ReturnsModule,
        ],
    })
], BusinessModule);
//# sourceMappingURL=business.module.js.map