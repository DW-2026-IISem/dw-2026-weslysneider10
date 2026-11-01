"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class PurchaseDetail extends sequelize_1.Model {
}
exports.PurchaseDetail = PurchaseDetail;
PurchaseDetail.init({
    purchaseId: {
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
    receivedQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "PurchaseDetail",
    tableName: "purchase_details",
    timestamps: false,
});
//# sourceMappingURL=purchase-detail.model.js.map