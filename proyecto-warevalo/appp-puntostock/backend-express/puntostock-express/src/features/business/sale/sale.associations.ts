import { Sale } from "./sale.model";
import { SaleDetail } from "./sale-detail.model";
import { Product } from "../product/product.model";

Sale.hasMany(SaleDetail, { foreignKey: "saleId", as: "items" });
SaleDetail.belongsTo(Sale, { foreignKey: "saleId", as: "sale" });

SaleDetail.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(SaleDetail, { foreignKey: "productId", as: "saleDetails" });
