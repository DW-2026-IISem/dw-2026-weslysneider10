"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("./product.model");
const product_type_model_1 = require("../product-type/product-type.model");
product_model_1.Product.belongsTo(product_type_model_1.ProductType, { foreignKey: "productTypeId", as: "productType" });
product_type_model_1.ProductType.hasMany(product_model_1.Product, { foreignKey: "productTypeId", as: "products" });
//# sourceMappingURL=product.associations.js.map