"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPurchases = seedPurchases;
const purchase_model_1 = require("../models/purchase.model");
const purchase_detail_model_1 = require("../models/purchase-detail.model");
const supplier_model_1 = require("../../../../suppliers/infrastructure/persistence/models/supplier.model");
const branch_model_1 = require("../../../../branches/infrastructure/persistence/models/branch.model");
const product_model_1 = require("../../../../products/infrastructure/persistence/models/product.model");
const purchase_entity_1 = require("../../../domain/entities/purchase.entity");
async function seedPurchases() {
    const count = await purchase_model_1.PurchaseModel.count();
    if (count > 0) {
        return;
    }
    const supplier = await supplier_model_1.SupplierModel.findOne();
    const branch = await branch_model_1.BranchModel.findOne();
    const product = await product_model_1.ProductModel.findByPk(1);
    if (!supplier || !branch || !product) {
        return;
    }
    const quantityOrdered = 20;
    const unitCost = Math.round(Number(product.price) * 0.6);
    const subtotal = quantityOrdered * unitCost;
    const tax = Math.round(subtotal * 0.19);
    const total = subtotal + tax;
    const sequelize = purchase_model_1.PurchaseModel.sequelize;
    await sequelize.transaction(async (transaction) => {
        const purchase = await purchase_model_1.PurchaseModel.create({
            purchaseDate: new Date(),
            supplierId: supplier.id,
            branchId: branch.id,
            status: purchase_entity_1.PurchaseStatus.PENDING,
            subtotal,
            tax,
            total,
        }, { transaction });
        await purchase_detail_model_1.PurchaseDetailModel.create({
            purchaseId: purchase.id,
            productId: product.id,
            quantityOrdered,
            quantityReceived: 0,
            unitCost,
            total: subtotal,
        }, { transaction });
    });
}
//# sourceMappingURL=purchases.seeder.js.map