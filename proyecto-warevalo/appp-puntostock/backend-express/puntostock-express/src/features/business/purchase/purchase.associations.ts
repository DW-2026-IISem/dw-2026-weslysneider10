import { Purchase } from "./purchase.model";
import { PurchaseDetail } from "./purchase.model";
import { Product } from "../product/product.model";

Purchase.hasMany(PurchaseDetail, { foreignKey: "purchaseId", as: "items" });
PurchaseDetail.belongsTo(Purchase, { foreignKey: "purchaseId", as: "purchase" });

PurchaseDetail.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(PurchaseDetail, { foreignKey: "productId", as: "purchaseDetails" });
