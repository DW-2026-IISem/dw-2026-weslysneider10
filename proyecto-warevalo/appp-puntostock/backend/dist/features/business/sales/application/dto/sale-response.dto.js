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
exports.SaleResponseDto = exports.SaleItemResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("../../../../../common/enums/status.enum");
class SaleItemResponseDto {
    id;
    productId;
    quantity;
    unitPrice;
    total;
}
exports.SaleItemResponseDto = SaleItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SaleItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SaleItemResponseDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], SaleItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59999 }),
    __metadata("design:type", Number)
], SaleItemResponseDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 119998 }),
    __metadata("design:type", Number)
], SaleItemResponseDto.prototype, "total", void 0);
class SaleResponseDto {
    id;
    saleDate;
    subtotal;
    tax;
    discounts;
    total;
    status;
    clientId;
    items;
    createdAt;
    updatedAt;
}
exports.SaleResponseDto = SaleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SaleResponseDto.prototype, "saleDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 119998 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22799 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "discounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 142797 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.Status, example: status_enum_1.Status.ACTIVE }),
    __metadata("design:type", String)
], SaleResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SaleResponseDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SaleItemResponseDto] }),
    __metadata("design:type", Array)
], SaleResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SaleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SaleResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=sale-response.dto.js.map