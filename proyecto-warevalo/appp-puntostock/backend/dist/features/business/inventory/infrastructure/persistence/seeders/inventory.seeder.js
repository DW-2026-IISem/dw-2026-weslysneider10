"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInventory = seedInventory;
const inventory_model_1 = require("../models/inventory.model");
const branch_model_1 = require("../../../../branches/infrastructure/persistence/models/branch.model");
const product_model_1 = require("../../../../products/infrastructure/persistence/models/product.model");
async function seedInventory() {
    const count = await inventory_model_1.InventoryModel.count();
    if (count > 0) {
        return;
    }
    const branches = await branch_model_1.BranchModel.findAll({ limit: 2 });
    const products = await product_model_1.ProductModel.findAll({ limit: 2 });
    if (branches.length === 0 || products.length === 0) {
        return;
    }
    const rows = [];
    for (const branch of branches) {
        for (const product of products) {
            rows.push({
                branchId: branch.id,
                productId: product.id,
                quantity: 20,
                minStock: 5,
            });
        }
    }
    await inventory_model_1.InventoryModel.bulkCreate(rows);
}
//# sourceMappingURL=inventory.seeder.js.map