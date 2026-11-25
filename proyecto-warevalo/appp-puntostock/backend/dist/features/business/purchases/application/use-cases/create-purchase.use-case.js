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
exports.CreatePurchaseUseCase = void 0;
const common_1 = require("@nestjs/common");
const supplier_repository_interface_1 = require("../../../suppliers/domain/interfaces/supplier-repository.interface");
const branch_repository_interface_1 = require("../../../branches/domain/interfaces/branch-repository.interface");
const product_repository_interface_1 = require("../../../products/domain/interfaces/product-repository.interface");
const product_not_found_exception_1 = require("../../../products/domain/exceptions/product-not-found.exception");
const purchase_entity_1 = require("../../domain/entities/purchase.entity");
const purchase_repository_interface_1 = require("../../domain/interfaces/purchase-repository.interface");
const purchase_calculator_domain_service_1 = require("../../domain/services/purchase-calculator.domain-service");
const purchase_mapper_1 = require("../mappers/purchase.mapper");
let CreatePurchaseUseCase = class CreatePurchaseUseCase {
    purchaseRepository;
    supplierRepository;
    branchRepository;
    productRepository;
    purchaseCalculator = new purchase_calculator_domain_service_1.PurchaseCalculatorDomainService();
    constructor(purchaseRepository, supplierRepository, branchRepository, productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.supplierRepository = supplierRepository;
        this.branchRepository = branchRepository;
        this.productRepository = productRepository;
    }
    async execute(dto) {
        const supplier = await this.supplierRepository.findById(dto.supplierId);
        if (!supplier) {
            throw new Error(`Proveedor ${dto.supplierId} no encontrado`);
        }
        const branch = await this.branchRepository.findById(dto.branchId);
        if (!branch) {
            throw new Error(`Sucursal ${dto.branchId} no encontrada`);
        }
        const items = [];
        for (const itemDto of dto.items) {
            const product = await this.productRepository.findById(itemDto.productId);
            if (!product) {
                throw new product_not_found_exception_1.ProductNotFoundException(itemDto.productId);
            }
            items.push(purchase_entity_1.PurchaseItem.create({
                productId: itemDto.productId,
                quantityOrdered: itemDto.quantityOrdered,
                unitCost: itemDto.unitCost,
            }));
        }
        const totals = this.purchaseCalculator.calculateTotals(dto.items, dto.tax ?? 0);
        const purchase = purchase_entity_1.Purchase.create({
            purchaseDate: new Date(),
            supplierId: dto.supplierId,
            branchId: dto.branchId,
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: totals.total,
            items,
        });
        const created = await this.purchaseRepository.create(purchase);
        return purchase_mapper_1.PurchaseMapper.toResponse(created);
    }
};
exports.CreatePurchaseUseCase = CreatePurchaseUseCase;
exports.CreatePurchaseUseCase = CreatePurchaseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(purchase_repository_interface_1.PURCHASE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(supplier_repository_interface_1.SUPPLIER_REPOSITORY)),
    __param(2, (0, common_1.Inject)(branch_repository_interface_1.BRANCH_REPOSITORY)),
    __param(3, (0, common_1.Inject)(product_repository_interface_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CreatePurchaseUseCase);
//# sourceMappingURL=create-purchase.use-case.js.map