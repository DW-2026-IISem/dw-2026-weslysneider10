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
exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const payment_method_enum_1 = require("../../domain/enums/payment-method.enum");
const payment_reference_type_enum_1 = require("../../domain/enums/payment-reference-type.enum");
class CreatePaymentDto {
    referenceType;
    referenceId;
    method;
    amount;
    paymentDate;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: payment_reference_type_enum_1.PaymentReferenceType, example: payment_reference_type_enum_1.PaymentReferenceType.SALE }),
    (0, class_validator_1.IsEnum)(payment_reference_type_enum_1.PaymentReferenceType),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: payment_method_enum_1.PaymentMethod, example: payment_method_enum_1.PaymentMethod.CASH }),
    (0, class_validator_1.IsEnum)(payment_method_enum_1.PaymentMethod),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-09-13T10:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreatePaymentDto.prototype, "paymentDate", void 0);
//# sourceMappingURL=create-payment.dto.js.map