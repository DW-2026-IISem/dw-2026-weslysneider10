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
exports.ListPurchasesUseCase = void 0;
const common_1 = require("@nestjs/common");
const purchase_repository_interface_1 = require("../../domain/interfaces/purchase-repository.interface");
const purchase_mapper_1 = require("../mappers/purchase.mapper");
let ListPurchasesUseCase = class ListPurchasesUseCase {
    purchaseRepository;
    constructor(purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }
    async execute(filter) {
        const result = await this.purchaseRepository.findAll(filter);
        return {
            items: result.items.map((purchase) => purchase_mapper_1.PurchaseMapper.toResponse(purchase)),
            meta: result.meta,
        };
    }
};
exports.ListPurchasesUseCase = ListPurchasesUseCase;
exports.ListPurchasesUseCase = ListPurchasesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(purchase_repository_interface_1.PURCHASE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListPurchasesUseCase);
//# sourceMappingURL=list-purchases.use-case.js.map