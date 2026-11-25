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
exports.CreateReturnUseCase = void 0;
const common_1 = require("@nestjs/common");
const sale_not_found_exception_1 = require("../../../sales/domain/exceptions/sale-not-found.exception");
const sale_repository_interface_1 = require("../../../sales/domain/interfaces/sale-repository.interface");
const product_not_found_exception_1 = require("../../../products/domain/exceptions/product-not-found.exception");
const product_repository_interface_1 = require("../../../products/domain/interfaces/product-repository.interface");
const invalid_return_quantity_exception_1 = require("../../domain/exceptions/invalid-return-quantity.exception");
const return_entity_1 = require("../../domain/entities/return.entity");
const return_repository_interface_1 = require("../../domain/interfaces/return-repository.interface");
const return_calculator_domain_service_1 = require("../../domain/services/return-calculator.domain-service");
const return_mapper_1 = require("../mappers/return.mapper");
let CreateReturnUseCase = class CreateReturnUseCase {
    returnRepository;
    saleRepository;
    productRepository;
    returnCalculator = new return_calculator_domain_service_1.ReturnCalculatorDomainService();
    constructor(returnRepository, saleRepository, productRepository) {
        this.returnRepository = returnRepository;
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }
    async execute(dto) {
        const sale = await this.saleRepository.findById(dto.saleId);
        if (!sale) {
            throw new sale_not_found_exception_1.SaleNotFoundException(dto.saleId);
        }
        const lines = [];
        for (const itemDto of dto.items) {
            const saleItem = sale.items.find((i) => i.productId === itemDto.productId);
            if (!saleItem) {
                throw new Error(`El producto ${itemDto.productId} no pertenece a la venta ${dto.saleId}`);
            }
            const product = await this.productRepository.findById(itemDto.productId);
            if (!product) {
                throw new product_not_found_exception_1.ProductNotFoundException(itemDto.productId);
            }
            const alreadyReturned = await this.returnRepository.getReturnedQuantityForSaleItem(dto.saleId, itemDto.productId);
            const available = saleItem.quantity - alreadyReturned;
            if (itemDto.quantity > available) {
                throw new invalid_return_quantity_exception_1.InvalidReturnQuantityException(product.name, saleItem.quantity, alreadyReturned, itemDto.quantity);
            }
            lines.push(return_entity_1.ReturnLine.create({
                productId: itemDto.productId,
                quantity: itemDto.quantity,
                unitPrice: saleItem.unitPrice,
            }));
        }
        const totals = this.returnCalculator.calculateTotals(lines);
        const returnEntity = return_entity_1.Return.create({
            returnDate: new Date(),
            reason: dto.reason,
            saleId: dto.saleId,
            subtotal: totals.subtotal,
            total: totals.total,
            lines,
        });
        const created = await this.returnRepository.create(returnEntity);
        return return_mapper_1.ReturnMapper.toResponse(created);
    }
};
exports.CreateReturnUseCase = CreateReturnUseCase;
exports.CreateReturnUseCase = CreateReturnUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(return_repository_interface_1.RETURN_REPOSITORY)),
    __param(1, (0, common_1.Inject)(sale_repository_interface_1.SALE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(product_repository_interface_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateReturnUseCase);
//# sourceMappingURL=create-return.use-case.js.map