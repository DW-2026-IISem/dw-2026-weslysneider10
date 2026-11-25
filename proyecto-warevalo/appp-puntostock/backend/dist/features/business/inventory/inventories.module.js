"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoriesModule = void 0;
const common_1 = require("@nestjs/common");
const branches_module_1 = require("../branches/branches.module");
const products_module_1 = require("../products/products.module");
const inventory_repository_interface_1 = require("./domain/interfaces/inventory-repository.interface");
const inventory_repository_1 = require("./infrastructure/persistence/repositories/inventory.repository");
const create_inventory_use_case_1 = require("./application/use-cases/create-inventory.use-case");
const update_inventory_use_case_1 = require("./application/use-cases/update-inventory.use-case");
const delete_inventory_use_case_1 = require("./application/use-cases/delete-inventory.use-case");
const get_inventory_use_case_1 = require("./application/use-cases/get-inventory.use-case");
const list_inventory_use_case_1 = require("./application/use-cases/list-inventory.use-case");
const list_low_stock_use_case_1 = require("./application/use-cases/list-low-stock.use-case");
const inventories_controller_1 = require("./presentation/http/controllers/inventories.controller");
let InventoriesModule = class InventoriesModule {
};
exports.InventoriesModule = InventoriesModule;
exports.InventoriesModule = InventoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [branches_module_1.BranchesModule, products_module_1.ProductsModule],
        controllers: [inventories_controller_1.InventoriesController],
        providers: [
            inventory_repository_1.InventoryRepository,
            { provide: inventory_repository_interface_1.INVENTORY_REPOSITORY, useExisting: inventory_repository_1.InventoryRepository },
            create_inventory_use_case_1.CreateInventoryUseCase,
            update_inventory_use_case_1.UpdateInventoryUseCase,
            delete_inventory_use_case_1.DeleteInventoryUseCase,
            get_inventory_use_case_1.GetInventoryUseCase,
            list_inventory_use_case_1.ListInventoryUseCase,
            list_low_stock_use_case_1.ListLowStockUseCase,
        ],
        exports: [inventory_repository_interface_1.INVENTORY_REPOSITORY],
    })
], InventoriesModule);
//# sourceMappingURL=inventories.module.js.map