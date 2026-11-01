"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Return extends sequelize_1.Model {
}
exports.Return = Return;
Return.init({
    saleDetailId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    motivo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Return",
    tableName: "returns",
    timestamps: true,
});
//# sourceMappingURL=return.model.js.map