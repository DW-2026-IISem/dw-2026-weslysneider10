"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypesModule = void 0;
const common_1 = require("@nestjs/common");
const product_type_repository_interface_1 = require("./domain/interfaces/product-type-repository.interface");
const product_type_repository_1 = require("./infrastructure/persistence/repositories/product-type.repository");
const create_product_type_use_case_1 = require("./application/use-cases/create-product-type.use-case");
const delete_product_type_use_case_1 = require("./application/use-cases/delete-product-type.use-case");
const get_product_type_use_case_1 = require("./application/use-cases/get-product-type.use-case");
const list_product_types_use_case_1 = require("./application/use-cases/list-product-types.use-case");
const update_product_type_use_case_1 = require("./application/use-cases/update-product-type.use-case");
const product_types_controller_1 = require("./presentation/http/controllers/product-types.controller");
let ProductTypesModule = class ProductTypesModule {
};
exports.ProductTypesModule = ProductTypesModule;
exports.ProductTypesModule = ProductTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            product_types_controller_1.ProductTypesController,
        ],
        providers: [
            product_type_repository_1.ProductTypeRepository,
            {
                provide: product_type_repository_interface_1.PRODUCT_TYPE_REPOSITORY,
                useExisting: product_type_repository_1.ProductTypeRepository,
            },
            create_product_type_use_case_1.CreateProductTypeUseCase,
            update_product_type_use_case_1.UpdateProductTypeUseCase,
            delete_product_type_use_case_1.DeleteProductTypeUseCase,
            get_product_type_use_case_1.GetProductTypeUseCase,
            list_product_types_use_case_1.ListProductTypesUseCase,
        ],
        exports: [
            product_type_repository_interface_1.PRODUCT_TYPE_REPOSITORY,
        ],
    })
], ProductTypesModule);
//# sourceMappingURL=product-types.module.js.map