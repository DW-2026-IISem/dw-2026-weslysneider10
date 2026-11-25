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
exports.SupplierResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("../../../../../common/enums/status.enum");
class SupplierResponseDto {
    id;
    nit;
    businessName;
    contactName;
    phone;
    email;
    status;
    createdAt;
    updatedAt;
}
exports.SupplierResponseDto = SupplierResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SupplierResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '900123456' }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "nit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Distribuidora La Guajira SAS' }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Carlos Ramírez' }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+57 300 1112233' }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ventas@distribuidoralaguajira.com' }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: status_enum_1.Status, example: status_enum_1.Status.ACTIVE }),
    __metadata("design:type", String)
], SupplierResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SupplierResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SupplierResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=supplier-response.dto.js.map