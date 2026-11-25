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
exports.ReturnResponseDto = exports.ReturnLineResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const return_status_enum_1 = require("../../domain/enums/return-status.enum");
class ReturnLineResponseDto {
    id;
    productId;
    quantity;
    unitPrice;
    total;
}
exports.ReturnLineResponseDto = ReturnLineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ReturnLineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ReturnLineResponseDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ReturnLineResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59999 }),
    __metadata("design:type", Number)
], ReturnLineResponseDto.prototype, "unitPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59999 }),
    __metadata("design:type", Number)
], ReturnLineResponseDto.prototype, "total", void 0);
class ReturnResponseDto {
    id;
    returnDate;
    reason;
    saleId;
    status;
    subtotal;
    total;
    lines;
    createdAt;
    updatedAt;
}
exports.ReturnResponseDto = ReturnResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "returnDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Producto en mal estado' }),
    __metadata("design:type", String)
], ReturnResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "saleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: return_status_enum_1.ReturnStatus, example: return_status_enum_1.ReturnStatus.COMPLETED }),
    __metadata("design:type", String)
], ReturnResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59999 }),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59999 }),
    __metadata("design:type", Number)
], ReturnResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReturnLineResponseDto] }),
    __metadata("design:type", Array)
], ReturnResponseDto.prototype, "lines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReturnResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=return-response.dto.js.map