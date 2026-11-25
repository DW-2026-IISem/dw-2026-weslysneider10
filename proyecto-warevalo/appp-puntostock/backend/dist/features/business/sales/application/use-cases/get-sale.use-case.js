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
exports.GetSaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const sale_not_found_exception_1 = require("../../domain/exceptions/sale-not-found.exception");
const sale_repository_interface_1 = require("../../domain/interfaces/sale-repository.interface");
const sale_mapper_1 = require("../mappers/sale.mapper");
let GetSaleUseCase = class GetSaleUseCase {
    saleRepository;
    constructor(saleRepository) {
        this.saleRepository = saleRepository;
    }
    async execute(id) {
        const sale = await this.saleRepository.findById(id);
        if (!sale) {
            throw new sale_not_found_exception_1.SaleNotFoundException(id);
        }
        return sale_mapper_1.SaleMapper.toResponse(sale);
    }
};
exports.GetSaleUseCase = GetSaleUseCase;
exports.GetSaleUseCase = GetSaleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sale_repository_interface_1.SALE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetSaleUseCase);
//# sourceMappingURL=get-sale.use-case.js.map