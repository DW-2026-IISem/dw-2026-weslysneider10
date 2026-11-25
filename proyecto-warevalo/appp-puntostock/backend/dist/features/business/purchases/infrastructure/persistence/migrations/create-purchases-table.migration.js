"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('purchases', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        purchaseDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
        supplierId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        branchId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        status: {
            type: sequelize_1.DataTypes.ENUM('PENDING', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'),
            allowNull: false,
            defaultValue: 'PENDING',
        },
        subtotal: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        tax: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        total: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
        updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    });
    await queryInterface.createTable('purchase_details', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        purchaseId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        quantityOrdered: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        quantityReceived: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        unitCost: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
        total: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable('purchase_details');
    await queryInterface.dropTable('purchases');
}
//# sourceMappingURL=create-purchases-table.migration.js.map