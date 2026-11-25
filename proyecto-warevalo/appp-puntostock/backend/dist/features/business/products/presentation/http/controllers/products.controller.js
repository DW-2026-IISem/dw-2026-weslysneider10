"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const create_product_use_case_1 = require("../../../application/use-cases/create-product.use-case");
const delete_product_use_case_1 = require("../../../application/use-cases/delete-product.use-case");
const get_product_use_case_1 = require("../../../application/use-cases/get-product.use-case");
const list_products_use_case_1 = require("../../../application/use-cases/list-products.use-case");
const update_product_use_case_1 = require("../../../application/use-cases/update-product.use-case");
const create_product_dto_1 = require("../../../application/dto/create-product.dto");
const product_filter_dto_1 = require("../../../application/dto/product-filter.dto");
const update_product_dto_1 = require("../../../application/dto/update-product.dto");
let ProductsController = class ProductsController {
    createProductUseCase;
    getProductUseCase;
    listProductsUseCase;
    updateProductUseCase;
    deleteProductUseCase;
    constructor(createProductUseCase, getProductUseCase, listProductsUseCase, updateProductUseCase, deleteProductUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.getProductUseCase = getProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }
    async create(dto) {
        const product = await this.createProductUseCase.execute(dto);
        return product;
    }
    async findAll(filters) {
        return this.listProductsUseCase.execute(filters);
    }
    async findOne(id) {
        const product = await this.getProductUseCase.execute(Number(id));
        return product;
    }
    async update(id, dto) {
        const product = await this.updateProductUseCase.execute(Number(id), dto);
        return product;
    }
    async remove(id) {
        await this.deleteProductUseCase.execute(Number(id));
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_filter_dto_1.ProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('api/products'),
    __metadata("design:paramtypes", [create_product_use_case_1.CreateProductUseCase,
        get_product_use_case_1.GetProductUseCase,
        list_products_use_case_1.ListProductsUseCase,
        update_product_use_case_1.UpdateProductUseCase,
        delete_product_use_case_1.DeleteProductUseCase])
], ProductsController);
//# sourceMappingURL=products.controller.js.map