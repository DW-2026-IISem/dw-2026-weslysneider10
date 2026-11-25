"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersModule = void 0;
const common_1 = require("@nestjs/common");
const supplier_repository_interface_1 = require("./domain/interfaces/supplier-repository.interface");
const supplier_repository_1 = require("./infrastructure/persistence/repositories/supplier.repository");
const create_supplier_use_case_1 = require("./application/use-cases/create-supplier.use-case");
const update_supplier_use_case_1 = require("./application/use-cases/update-supplier.use-case");
const delete_supplier_use_case_1 = require("./application/use-cases/delete-supplier.use-case");
const get_supplier_use_case_1 = require("./application/use-cases/get-supplier.use-case");
const list_suppliers_use_case_1 = require("./application/use-cases/list-suppliers.use-case");
const suppliers_controller_1 = require("./presentation/http/controllers/suppliers.controller");
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        controllers: [suppliers_controller_1.SuppliersController],
        providers: [
            supplier_repository_1.SupplierRepository,
            { provide: supplier_repository_interface_1.SUPPLIER_REPOSITORY, useExisting: supplier_repository_1.SupplierRepository },
            create_supplier_use_case_1.CreateSupplierUseCase,
            update_supplier_use_case_1.UpdateSupplierUseCase,
            delete_supplier_use_case_1.DeleteSupplierUseCase,
            get_supplier_use_case_1.GetSupplierUseCase,
            list_suppliers_use_case_1.ListSuppliersUseCase,
        ],
        exports: [supplier_repository_interface_1.SUPPLIER_REPOSITORY],
    })
], SuppliersModule);
//# sourceMappingURL=suppliers.module.js.map