"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Supplier extends sequelize_1.Model {
}
exports.Supplier = Supplier;
Supplier.init({
    nit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    razonSocial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contacto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: true,
});
//# sourceMappingURL=supplier.model.js.map