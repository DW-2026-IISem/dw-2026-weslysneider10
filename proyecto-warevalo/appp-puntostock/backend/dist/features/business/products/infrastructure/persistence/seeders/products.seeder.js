"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = seedProducts;
const product_model_1 = require("../models/product.model");
async function seedProducts() {
    const count = await product_model_1.ProductModel.count();
    if (count > 0) {
        return;
    }
    await product_model_1.ProductModel.bulkCreate([
        {
            sku: 'PROD-001',
            name: 'Producto de ejemplo 1',
            description: 'Producto inicial para PuntoStock',
            price: 10000,
            isActive: true,
        },
        {
            sku: 'PROD-002',
            name: 'Producto de ejemplo 2',
            description: 'Producto inicial para PuntoStock',
            price: 15000,
            isActive: true,
        },
        {
            sku: 'PROD-003',
            name: 'Producto de ejemplo 3',
            description: 'Producto inicial para PuntoStock',
            price: 20000,
            isActive: true,
        },
    ]);
}
//# sourceMappingURL=products.seeder.js.map