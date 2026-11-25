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
exports.ReturnDetailModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let ReturnDetailModel = class ReturnDetailModel extends sequelize_typescript_1.Model {
};
exports.ReturnDetailModel = ReturnDetailModel;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('./return.model').ReturnModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "returnId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('./return.model').ReturnModel),
    __metadata("design:type", Object)
], ReturnDetailModel.prototype, "returnHeader", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => require('../../../../products/infrastructure/persistence/models/product.model')
        .ProductModel),
    __metadata("design:type", Object)
], ReturnDetailModel.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "unitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], ReturnDetailModel.prototype, "total", void 0);
exports.ReturnDetailModel = ReturnDetailModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'return_details' })
], ReturnDetailModel);
//# sourceMappingURL=return-detail.model.js.map