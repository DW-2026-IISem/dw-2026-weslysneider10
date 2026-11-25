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
exports.CancelPurchaseUseCase = void 0;
const common_1 = require("@nestjs/common");
const invalid_purchase_status_exception_1 = require("../../domain/exceptions/invalid-purchase-status.exception");
const purchase_not_found_exception_1 = require("../../domain/exceptions/purchase-not-found.exception");
const purchase_entity_1 = require("../../domain/entities/purchase.entity");
const purchase_repository_interface_1 = require("../../domain/interfaces/purchase-repository.interface");
const purchase_mapper_1 = require("../mappers/purchase.mapper");
let CancelPurchaseUseCase = class CancelPurchaseUseCase {
    purchaseRepository;
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async execute(id) {
        const purchase = await this.purchaseRepository.findById(id);
        if (!purchase) {
            throw new purchase_not_found_exception_1.PurchaseNotFoundException(id);
        }
        if (purchase.status === purchase_entity_1.PurchaseStatus.RECEIVED) {
            throw new invalid_purchase_status_exception_1.InvalidPurchaseStatusException(purchase.status, 'cancelar');
        }
        purchase.cancel();
        const updated = await this.purchaseRepository.update(purchase);
        return purchase_mapper_1.PurchaseMapper.toResponse(updated);
    }
};
exports.CancelPurchaseUseCase = CancelPurchaseUseCase;
exports.CancelPurchaseUseCase = CancelPurchaseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(purchase_repository_interface_1.PURCHASE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CancelPurchaseUseCase);
//# sourceMappingURL=cancel-purchase.use-case.js.map