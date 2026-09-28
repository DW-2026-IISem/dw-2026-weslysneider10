import { Product } from "./product.model";
import { ProductType } from "../product-type/product-type.model";

Product.belongsTo(ProductType, { foreignKey: "productTypeId", as: "productType" });
ProductType.hasMany(Product, { foreignKey: "productTypeId", as: "products" });
