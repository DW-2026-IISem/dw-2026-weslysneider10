"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_model_1 = require("./purchase.model");
const purchase_detail_model_1 = require("./purchase-detail.model");
const product_model_1 = require("../product/product.model");
purchase_model_1.Purchase.hasMany(purchase_detail_model_1.PurchaseDetail, { foreignKey: "purchaseId", as: "items" });
purchase_detail_model_1.PurchaseDetail.belongsTo(purchase_model_1.Purchase, { foreignKey: "purchaseId", as: "purchase" });
purchase_detail_model_1.PurchaseDetail.belongsTo(product_model_1.Product, { foreignKey: "productId", as: "product" });
product_model_1.Product.hasMany(purchase_detail_model_1.PurchaseDetail, { foreignKey: "productId", as: "purchaseDetails" });
//# sourceMappingURL=purchase.associations.js.map