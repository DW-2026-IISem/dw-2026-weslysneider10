"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sale_model_1 = require("./sale.model");
const sale_detail_model_1 = require("./sale-detail.model");
const product_model_1 = require("../product/product.model");
sale_model_1.Sale.hasMany(sale_detail_model_1.SaleDetail, { foreignKey: "saleId", as: "items" });
sale_detail_model_1.SaleDetail.belongsTo(sale_model_1.Sale, { foreignKey: "saleId", as: "sale" });
sale_detail_model_1.SaleDetail.belongsTo(product_model_1.Product, { foreignKey: "productId", as: "product" });
product_model_1.Product.hasMany(sale_detail_model_1.SaleDetail, { foreignKey: "productId", as: "saleDetails" });
//# sourceMappingURL=sale.associations.js.map