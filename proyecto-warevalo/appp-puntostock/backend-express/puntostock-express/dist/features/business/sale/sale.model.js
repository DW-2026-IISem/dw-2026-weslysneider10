"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Sale extends sequelize_1.Model {
}
exports.Sale = Sale;
Sale.init({
    clientId: {
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
        type: sequelize_1.DataTypes.ENUM("completed", "cancelled"),
        allowNull: false,
        defaultValue: "completed",
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Sale",
    tableName: "sales",
    timestamps: true,
});
//# sourceMappingURL=sale.model.js.map