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
exports.SaleModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const status_enum_1 = require("../../../../../../common/enums/status.enum");
let SaleModel = class SaleModel extends sequelize_typescript_1.Model {
};
exports.SaleModel = SaleModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], SaleModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], SaleModel.prototype, "saleDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleModel.prototype, "subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleModel.prototype, "tax", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleModel.prototype, "discounts", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], SaleModel.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(status_enum_1.Status)),
        allowNull: false,
        defaultValue: status_enum_1.Status.ACTIVE,
    }),
    __metadata("design:type", String)
], SaleModel.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../clients/infrastructure/persistence/models/client.model').ClientModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SaleModel.prototype, "clientId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../clients/infrastructure/persistence/models/client.model').ClientModel),
    __metadata("design:type", Object)
], SaleModel.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], SaleModel.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], SaleModel.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => require('./product-sale.model').ProductSaleModel),
    __metadata("design:type", Array)
], SaleModel.prototype, "items", void 0);
exports.SaleModel = SaleModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sales' })
], SaleModel);
//# sourceMappingURL=sale.model.js.map