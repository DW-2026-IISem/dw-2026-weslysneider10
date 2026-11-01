"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = seedProducts;
const faker_1 = require("@faker-js/faker");
const product_model_1 = require("./product.model");
const product_type_model_1 = require("../product-type/product-type.model");
/**
 * Seeder del feature Product (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Requiere tipos de producto activos. Idempotente: si ya hay filas, no inserta.
 */
async function seedProducts(count) {
    if (count <= 0) {
        console.log("⏭️  products: count=0, se omite");
        return 0;
    }
    const existing = await product_model_1.Product.count();
    if (existing > 0) {
        console.log(`⏭️  products: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const types = await product_type_model_1.ProductType.findAll({ where: { status: "active" } });
    if (types.length === 0) {
        console.log("⏭️  products: no hay tipos de producto activos, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, () => {
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            sku: faker_1.faker.string.alphanumeric(8).toUpperCase(),
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: Number(faker_1.faker.commerce.price({ min: 500, max: 50000, dec: 0 })),
            productTypeId: type.id,
            status: "active",
        };
    });
    await product_model_1.Product.bulkCreate(rows);
    console.log(`✅ products: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=product.seeder.js.map