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
exports.PurchaseDetailModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let PurchaseDetailModel = class PurchaseDetailModel extends sequelize_typescript_1.Model {
};
exports.PurchaseDetailModel = PurchaseDetailModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    __metadata("design:type", Object)
], PurchaseDetailModel.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('./purchase.model').PurchaseModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "purchaseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('./purchase.model').PurchaseModel),
    __metadata("design:type", Object)
], PurchaseDetailModel.prototype, "purchase", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "quantityOrdered", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "quantityReceived", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "unitCost", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], PurchaseDetailModel.prototype, "total", void 0);
exports.PurchaseDetailModel = PurchaseDetailModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'purchase_details' })
], PurchaseDetailModel);
//# sourceMappingURL=purchase-detail.model.js.map