"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    saleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    metodo: {
        type: sequelize_1.DataTypes.ENUM("cash", "card", "transfer"),
        allowNull: false,
    },
    monto: {
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
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
});
//# sourceMappingURL=payment.model.js.map