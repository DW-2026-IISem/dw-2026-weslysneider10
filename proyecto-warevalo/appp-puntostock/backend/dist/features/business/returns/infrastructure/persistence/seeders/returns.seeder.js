"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReturns = seedReturns;
const return_model_1 = require("../models/return.model");
const return_detail_model_1 = require("../models/return-detail.model");
const sale_model_1 = require("../../../../sales/infrastructure/persistence/models/sale.model");
const product_sale_model_1 = require("../../../../sales/infrastructure/persistence/models/product-sale.model");
const product_model_1 = require("../../../../products/infrastructure/persistence/models/product.model");
async function seedReturns() {
    const count = await return_model_1.ReturnModel.count();
    if (count > 0) {
        return;
    }
    const sale = await sale_model_1.SaleModel.findOne({ include: [product_sale_model_1.ProductSaleModel] });
    if (!sale) {
        return;
    }
    const saleItem = sale.items?.[0];
    if (!saleItem) {
        return;
    }
    const quantity = 1;
    const unitPrice = Number(saleItem.unitPrice);
    const subtotal = quantity * unitPrice;
    const sequelize = return_model_1.ReturnModel.sequelize;
    await sequelize.transaction(async (transaction) => {
        const returnHeader = await return_model_1.ReturnModel.create({
            returnDate: new Date(),
            reason: 'Producto en mal estado',
            saleId: sale.id,
            subtotal,
            total: subtotal,
        }, { transaction });
        await return_detail_model_1.ReturnDetailModel.create({
            returnId: returnHeader.id,
            productId: saleItem.productId,
            quantity,
            unitPrice,
            total: subtotal,
        }, { transaction });
        const product = await product_model_1.ProductModel.findByPk(saleItem.productId, { transaction });
        if (product) {
            await product.update({ quantity: product.quantity + quantity }, { transaction });
        }
    });
}
//# sourceMappingURL=returns.seeder.js.map