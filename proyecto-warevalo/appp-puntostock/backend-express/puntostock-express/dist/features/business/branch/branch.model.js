"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Branch extends sequelize_1.Model {
}
exports.Branch = Branch;
Branch.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Branch",
    tableName: "branches",
    timestamps: true,
});
//# sourceMappingURL=branch.model.js.map