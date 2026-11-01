"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Purchase extends sequelize_1.Model {
}
exports.Purchase = Purchase;
Purchase.init({
    supplierId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    impuestos: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("pending", "partial", "received", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Purchase",
    tableName: "purchases",
    timestamps: true,
});
//# sourceMappingURL=purchase.model.js.map