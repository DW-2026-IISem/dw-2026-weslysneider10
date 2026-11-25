"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSales = seedSales;
const sale_model_1 = require("../models/sale.model");
const product_sale_model_1 = require("../models/product-sale.model");
const client_model_1 = require("../../../../clients/infrastructure/persistence/models/client.model");
const product_model_1 = require("../../../../products/infrastructure/persistence/models/product.model");
const status_enum_1 = require("../../../../../../common/enums/status.enum");
async function seedSales() {
    const count = await sale_model_1.SaleModel.count();
    if (count > 0) {
        return;
    }
    const clientCount = await client_model_1.ClientModel.count();
    const productCount = await product_model_1.ProductModel.count();
    if (clientCount === 0 || productCount === 0) {
        return;
    }
    const product = await product_model_1.ProductModel.findByPk(1);
    if (!product) {
        return;
    }
    const quantity = 1;
    const unitPrice = Number(product.price);
    const subtotal = quantity * unitPrice;
    const tax = Math.round(subtotal * 0.19);
    const discounts = 0;
    const total = subtotal + tax - discounts;
    const sequelize = sale_model_1.SaleModel.sequelize;
    await sequelize.transaction(async (transaction) => {
        const sale = await sale_model_1.SaleModel.create({
            saleDate: new Date(),
            subtotal,
            tax,
            discounts,
            total,
            status: status_enum_1.Status.ACTIVE,
            clientId: 1,
        }, { transaction });
        await product_sale_model_1.ProductSaleModel.create({
            saleId: sale.id,
            productId: product.id,
            quantity,
            unitPrice,
            total: subtotal,
        }, { transaction });
    });
}
//# sourceMappingURL=sales.seeder.js.map