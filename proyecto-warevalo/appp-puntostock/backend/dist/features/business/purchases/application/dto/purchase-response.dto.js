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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseResponseDto = exports.PurchaseDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const purchase_entity_1 = require("../../domain/entities/purchase.entity");
class PurchaseDetailResponseDto {
    id;
    productId;
    quantityOrdered;
    quantityReceived;
    unitCost;
    total;
}
exports.PurchaseDetailResponseDto = PurchaseDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "quantityOrdered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "quantityReceived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 27000 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 540000 }),
    __metadata("design:type", Number)
], PurchaseDetailResponseDto.prototype, "total", void 0);
class PurchaseResponseDto {
    id;
    purchaseDate;
    supplierId;
    branchId;
    status;
    subtotal;
    tax;
    total;
    items;
    createdAt;
    updatedAt;
}
exports.PurchaseResponseDto = PurchaseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PurchaseResponseDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "supplierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: purchase_entity_1.PurchaseStatus, example: purchase_entity_1.PurchaseStatus.PENDING }),
    __metadata("design:type", String)
], PurchaseResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 540000 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 102600 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 642600 }),
    __metadata("design:type", Number)
], PurchaseResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PurchaseDetailResponseDto] }),
    __metadata("design:type", Array)
], PurchaseResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PurchaseResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PurchaseResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=purchase-response.dto.js.map