"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const product_repository_interface_1 = require("./domain/interfaces/product-repository.interface");
const product_repository_1 = require("./infrastructure/persistence/repositories/product.repository");
const create_product_use_case_1 = require("./application/use-cases/create-product.use-case");
const update_product_use_case_1 = require("./application/use-cases/update-product.use-case");
const delete_product_use_case_1 = require("./application/use-cases/delete-product.use-case");
const get_product_use_case_1 = require("./application/use-cases/get-product.use-case");
const list_products_use_case_1 = require("./application/use-cases/list-products.use-case");
const products_controller_1 = require("./presentation/http/controllers/products.controller");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            products_controller_1.ProductsController,
        ],
        providers: [
            product_repository_1.ProductRepository,
            {
                provide: product_repository_interface_1.PRODUCT_REPOSITORY,
                useExisting: product_repository_1.ProductRepository,
            },
            create_product_use_case_1.CreateProductUseCase,
            update_product_use_case_1.UpdateProductUseCase,
            delete_product_use_case_1.DeleteProductUseCase,
            get_product_use_case_1.GetProductUseCase,
            list_products_use_case_1.ListProductsUseCase,
        ],
        exports: [
            product_repository_interface_1.PRODUCT_REPOSITORY,
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map