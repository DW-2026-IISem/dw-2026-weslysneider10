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
exports.ProductTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parse_positive_int_pipe_1 = require("../../../../../../common/pipes/parse-positive-int.pipe");
const create_product_type_dto_1 = require("../../../application/dto/create-product-type.dto");
const product_type_filter_dto_1 = require("../../../application/dto/product-type-filter.dto");
const product_type_response_dto_1 = require("../../../application/dto/product-type-response.dto");
const update_product_type_dto_1 = require("../../../application/dto/update-product-type.dto");
const create_product_type_use_case_1 = require("../../../application/use-cases/create-product-type.use-case");
const delete_product_type_use_case_1 = require("../../../application/use-cases/delete-product-type.use-case");
const get_product_type_use_case_1 = require("../../../application/use-cases/get-product-type.use-case");
const list_product_types_use_case_1 = require("../../../application/use-cases/list-product-types.use-case");
const update_product_type_use_case_1 = require("../../../application/use-cases/update-product-type.use-case");
let ProductTypesController = class ProductTypesController {
    createProductTypeUseCase;
    updateProductTypeUseCase;
    deleteProductTypeUseCase;
    getProductTypeUseCase;
    listProductTypesUseCase;
    constructor(createProductTypeUseCase, updateProductTypeUseCase, deleteProductTypeUseCase, getProductTypeUseCase, listProductTypesUseCase) {
        this.createProductTypeUseCase = createProductTypeUseCase;
        this.updateProductTypeUseCase = updateProductTypeUseCase;
        this.deleteProductTypeUseCase = deleteProductTypeUseCase;
        this.getProductTypeUseCase = getProductTypeUseCase;
        this.listProductTypesUseCase = listProductTypesUseCase;
    }
    create(dto) {
        return this.createProductTypeUseCase.execute(dto);
    }
    findAll(filter) {
        return this.listProductTypesUseCase.execute(filter);
    }
    findOne(id) {
        return this.getProductTypeUseCase.execute(id);
    }
    update(id, dto) {
        return this.updateProductTypeUseCase.execute(id, dto);
    }
    async remove(id) {
        await this.deleteProductTypeUseCase.execute(id);
    }
};
exports.ProductTypesController = ProductTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un tipo de producto',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: product_type_response_dto_1.ProductTypeResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_type_dto_1.CreateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar tipos de producto',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: product_type_response_dto_1.ProductTypeResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_type_filter_dto_1.ProductTypeFilterDto]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener un tipo de producto por ID',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: product_type_response_dto_1.ProductTypeResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar un tipo de producto',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: product_type_response_dto_1.ProductTypeResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_type_dto_1.UpdateProductTypeDto]),
    __metadata("design:returntype", void 0)
], ProductTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar un tipo de producto',
    }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', parse_positive_int_pipe_1.ParsePositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "remove", null);
exports.ProductTypesController = ProductTypesController = __decorate([
    (0, swagger_1.ApiTags)('Product Types'),
    (0, common_1.Controller)('product-types'),
    __metadata("design:paramtypes", [create_product_type_use_case_1.CreateProductTypeUseCase,
        update_product_type_use_case_1.UpdateProductTypeUseCase,
        delete_product_type_use_case_1.DeleteProductTypeUseCase,
        get_product_type_use_case_1.GetProductTypeUseCase,
        list_product_types_use_case_1.ListProductTypesUseCase])
], ProductTypesController);
//# sourceMappingURL=product-types.controller.js.map