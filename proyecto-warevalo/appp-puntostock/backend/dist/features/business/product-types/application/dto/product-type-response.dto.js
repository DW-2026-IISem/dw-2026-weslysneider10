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
exports.ProductTypeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("../../../../../common/enums/status.enum");
class ProductTypeResponseDto {
    id;
    name;
    description;
    status;
    createdAt;
    updatedAt;
}
exports.ProductTypeResponseDto = ProductTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], ProductTypeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Electrónica',
    }),
    __metadata("design:type", String)
], ProductTypeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Dispositivos electrónicos y accesorios',
    }),
    __metadata("design:type", String)
], ProductTypeResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: status_enum_1.Status,
        example: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], ProductTypeResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-08-24T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProductTypeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-08-24T12:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProductTypeResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=product-type-response.dto.js.map