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
exports.ReturnModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const return_status_enum_1 = require("../../../domain/enums/return-status.enum");
let ReturnModel = class ReturnModel extends sequelize_typescript_1.Model {
};
exports.ReturnModel = ReturnModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ReturnModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], ReturnModel.prototype, "returnDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], ReturnModel.prototype, "reason", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../sales/infrastructure/persistence/models/sale.model')
        .SaleModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReturnModel.prototype, "saleId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../sales/infrastructure/persistence/models/sale.model')
        .SaleModel),
    __metadata("design:type", Object)
], ReturnModel.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(return_status_enum_1.ReturnStatus)),
        allowNull: false,
        defaultValue: return_status_enum_1.ReturnStatus.COMPLETED,
    }),
    __metadata("design:type", String)
], ReturnModel.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ReturnModel.prototype, "subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], ReturnModel.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ReturnModel.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ReturnModel.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => require('./return-detail.model').ReturnDetailModel),
    __metadata("design:type", Array)
], ReturnModel.prototype, "details", void 0);
exports.ReturnModel = ReturnModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'returns' })
], ReturnModel);
//# sourceMappingURL=return.model.js.map