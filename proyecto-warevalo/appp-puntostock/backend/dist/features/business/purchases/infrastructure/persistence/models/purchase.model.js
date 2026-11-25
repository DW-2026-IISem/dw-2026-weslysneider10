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
exports.PurchaseModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const purchase_entity_1 = require("../../../domain/entities/purchase.entity");
let PurchaseModel = class PurchaseModel extends sequelize_typescript_1.Model {
};
exports.PurchaseModel = PurchaseModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], PurchaseModel.prototype, "purchaseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../suppliers/infrastructure/persistence/models/supplier.model')
        .SupplierModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "supplierId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../suppliers/infrastructure/persistence/models/supplier.model')
        .SupplierModel),
    __metadata("design:type", Object)
], PurchaseModel.prototype, "supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "branchId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel),
    __metadata("design:type", Object)
], PurchaseModel.prototype, "branch", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(purchase_entity_1.PurchaseStatus)),
        allowNull: false,
        defaultValue: purchase_entity_1.PurchaseStatus.PENDING,
    }),
    __metadata("design:type", String)
], PurchaseModel.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "tax", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], PurchaseModel.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], PurchaseModel.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], PurchaseModel.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => require('./purchase-detail.model').PurchaseDetailModel),
    __metadata("design:type", Array)
], PurchaseModel.prototype, "details", void 0);
exports.PurchaseModel = PurchaseModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'purchases' })
], PurchaseModel);
//# sourceMappingURL=purchase.model.js.map