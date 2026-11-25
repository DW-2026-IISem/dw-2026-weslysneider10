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
exports.PaymentModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const payment_method_enum_1 = require("../../../domain/enums/payment-method.enum");
const payment_reference_type_enum_1 = require("../../../domain/enums/payment-reference-type.enum");
const payment_status_enum_1 = require("../../../domain/enums/payment-status.enum");
let PaymentModel = class PaymentModel extends sequelize_typescript_1.Model {
};
exports.PaymentModel = PaymentModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], PaymentModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(payment_reference_type_enum_1.PaymentReferenceType)),
        allowNull: false,
    }),
    __metadata("design:type", String)
], PaymentModel.prototype, "referenceType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PaymentModel.prototype, "referenceId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(payment_method_enum_1.PaymentMethod)),
        allowNull: false,
    }),
    __metadata("design:type", String)
], PaymentModel.prototype, "method", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], PaymentModel.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], PaymentModel.prototype, "paymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(payment_status_enum_1.PaymentStatus)),
        allowNull: false,
        defaultValue: payment_status_enum_1.PaymentStatus.CONFIRMED,
    }),
    __metadata("design:type", String)
], PaymentModel.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], PaymentModel.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], PaymentModel.prototype, "updatedAt", void 0);
exports.PaymentModel = PaymentModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'payments' })
], PaymentModel);
//# sourceMappingURL=payment.model.js.map