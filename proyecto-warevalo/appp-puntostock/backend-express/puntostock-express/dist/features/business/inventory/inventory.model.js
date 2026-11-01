"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Inventory extends sequelize_1.Model {
}
exports.Inventory = Inventory;
Inventory.init({
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    minStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Inventory",
    tableName: "inventories",
    timestamps: true,
    createdAt: false,
    updatedAt: true,
    indexes: [
        {
            name: "uq_inventory_branch_product",
            unique: true,
            fields: ["branchId", "productId"],
        },
    ],
});
//# sourceMappingURL=inventory.model.js.map