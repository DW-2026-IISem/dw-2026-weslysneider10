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
exports.CreateSaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const sale_repository_interface_1 = require("../../domain/interfaces/sale-repository.interface");
const sale_entity_1 = require("../../domain/entities/sale.entity");
const sale_calculator_domain_service_1 = require("../../domain/services/sale-calculator.domain-service");
const sale_mapper_1 = require("../mappers/sale.mapper");
let CreateSaleUseCase = class CreateSaleUseCase {
    saleRepository;
    saleCalculator;
    constructor(saleRepository, saleCalculator) {
        this.saleRepository = saleRepository;
        this.saleCalculator = saleCalculator;
    }
    async execute(dto) {
        if (dto.clientId === undefined) {
            throw new Error('El cliente es obligatorio para registrar una venta');
        }
        const items = dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
        }));
        const totals = this.saleCalculator.calculate({
            items,
            tax: dto.tax,
            discounts: dto.discounts,
        });
        const sale = sale_entity_1.Sale.create({
            saleDate: new Date(),
            subtotal: totals.subtotal,
            tax: totals.tax,
            discounts: totals.discounts,
            total: totals.total,
            clientId: dto.clientId,
            items,
        });
        const created = await this.saleRepository.create(sale);
        return sale_mapper_1.SaleMapper.toResponse(created);
    }
};
exports.CreateSaleUseCase = CreateSaleUseCase;
exports.CreateSaleUseCase = CreateSaleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sale_repository_interface_1.SALE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, sale_calculator_domain_service_1.SaleCalculatorDomainService])
], CreateSaleUseCase);
//# sourceMappingURL=create-sale.use-case.js.map