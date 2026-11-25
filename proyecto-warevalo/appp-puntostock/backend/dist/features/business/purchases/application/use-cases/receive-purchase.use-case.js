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
exports.ReceivePurchaseUseCase = void 0;
const common_1 = require("@nestjs/common");
const inventory_repository_interface_1 = require("../../../inventory/domain/interfaces/inventory-repository.interface");
const inventory_entity_1 = require("../../../inventory/domain/entities/inventory.entity");
const product_repository_interface_1 = require("../../../products/domain/interfaces/product-repository.interface");
const invalid_purchase_status_exception_1 = require("../../domain/exceptions/invalid-purchase-status.exception");
const invalid_receipt_quantity_exception_1 = require("../../domain/exceptions/invalid-receipt-quantity.exception");
const purchase_not_found_exception_1 = require("../../domain/exceptions/purchase-not-found.exception");
const purchase_entity_1 = require("../../domain/entities/purchase.entity");
const purchase_repository_interface_1 = require("../../domain/interfaces/purchase-repository.interface");
const purchase_mapper_1 = require("../mappers/purchase.mapper");
let ReceivePurchaseUseCase = class ReceivePurchaseUseCase {
    purchaseRepository;
    inventoryRepository;
    productRepository;
    constructor(purchaseRepository, inventoryRepository, productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }
    async execute(id, dto) {
        const purchase = await this.purchaseRepository.findById(id);
        if (!purchase) {
            throw new purchase_not_found_exception_1.PurchaseNotFoundException(id);
        }
        if (purchase.status === purchase_entity_1.PurchaseStatus.RECEIVED ||
            purchase.status === purchase_entity_1.PurchaseStatus.CANCELLED) {
            throw new invalid_purchase_status_exception_1.InvalidPurchaseStatusException(purchase.status, 'recibir');
        }
        for (const receipt of dto.items) {
            const item = purchase.items.find((i) => i.productId === receipt.productId);
            if (item && item.quantityReceived + receipt.quantity > item.quantityOrdered) {
                const product = await this.productRepository.findById(receipt.productId);
                throw new invalid_receipt_quantity_exception_1.InvalidReceiptQuantityException(product?.name ?? `producto ${receipt.productId}`, item.quantityOrdered, item.quantityReceived + receipt.quantity);
            }
        }
        purchase.receiveItems(dto.items);
        for (const receipt of dto.items) {
            const existingInventory = await this.inventoryRepository.findByBranchAndProduct(purchase.branchId, receipt.productId);
            if (existingInventory) {
                existingInventory.increaseStock(receipt.quantity);
                await this.inventoryRepository.update(existingInventory);
            }
            else {
                const newInventory = inventory_entity_1.Inventory.create({
                    branchId: purchase.branchId,
                    productId: receipt.productId,
                    quantity: receipt.quantity,
                    minStock: 0,
                });
                await this.inventoryRepository.create(newInventory);
            }
        }
        const updated = await this.purchaseRepository.update(purchase);
        return purchase_mapper_1.PurchaseMapper.toResponse(updated);
    }
};
exports.ReceivePurchaseUseCase = ReceivePurchaseUseCase;
exports.ReceivePurchaseUseCase = ReceivePurchaseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(purchase_repository_interface_1.PURCHASE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(inventory_repository_interface_1.INVENTORY_REPOSITORY)),
    __param(2, (0, common_1.Inject)(product_repository_interface_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ReceivePurchaseUseCase);
//# sourceMappingURL=receive-purchase.use-case.js.map