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
exports.ListProductTypesUseCase = void 0;
const common_1 = require("@nestjs/common");
const product_type_repository_interface_1 = require("../../domain/interfaces/product-type-repository.interface");
const product_type_mapper_1 = require("../mappers/product-type.mapper");
let ListProductTypesUseCase = class ListProductTypesUseCase {
    productTypeRepository;
    constructor(productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
    async execute(filter) {
        const result = await this.productTypeRepository.findAll({
            page: filter.page,
            limit: filter.limit,
            search: filter.search,
        });
        return {
            items: result.items.map((productType) => product_type_mapper_1.ProductTypeMapper.toResponse(productType)),
            meta: result.meta,
        };
    }
};
exports.ListProductTypesUseCase = ListProductTypesUseCase;
exports.ListProductTypesUseCase = ListProductTypesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(product_type_repository_interface_1.PRODUCT_TYPE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListProductTypesUseCase);
//# sourceMappingURL=list-product-types.use-case.js.map