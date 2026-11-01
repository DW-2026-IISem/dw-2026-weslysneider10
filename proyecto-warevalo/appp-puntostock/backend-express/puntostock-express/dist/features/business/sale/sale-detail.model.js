"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class SaleDetail extends sequelize_1.Model {
}
exports.SaleDetail = SaleDetail;
SaleDetail.init({
    saleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    valorUnitario: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "SaleDetail",
    tableName: "sale_details",
    timestamps: false,
});
//# sourceMappingURL=sale-detail.model.js.map