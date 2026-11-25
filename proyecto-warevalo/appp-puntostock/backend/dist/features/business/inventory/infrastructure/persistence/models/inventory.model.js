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
exports.InventoryModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let InventoryModel = class InventoryModel extends sequelize_typescript_1.Model {
};
exports.InventoryModel = InventoryModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], InventoryModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "branchId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../branches/infrastructure/persistence/models/branch.model')
        .BranchModel),
    __metadata("design:type", Object)
], InventoryModel.prototype, "branch", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    __metadata("design:type", Object)
], InventoryModel.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], InventoryModel.prototype, "minStock", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], InventoryModel.prototype, "updatedAt", void 0);
exports.InventoryModel = InventoryModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'inventories',
        timestamps: true,
        createdAt: false,
        indexes: [
            {
                name: 'uq_inventory_branch_product',
                unique: true,
                fields: ['branchId', 'productId'],
            },
        ],
    })
], InventoryModel);
//# sourceMappingURL=inventory.model.js.map