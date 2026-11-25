"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable('returns', {
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        returnDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
        reason: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
        saleId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        status: {
            type: sequelize_1.DataTypes.ENUM('COMPLETED', 'CANCELLED'),
            allowNull: false,
            defaultValue: 'COMPLETED',
        },
        subtotal: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        total: { type: sequelize_1.DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
        updatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    });
    await queryInterface.createTable('return_details', {
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        returnId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        productId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        unitPrice: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
        total: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable('return_details');
    await queryInterface.dropTable('returns');
}
//# sourceMappingURL=create-returns-table.migration.js.map