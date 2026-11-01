"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPurchases = seedPurchases;
const faker_1 = require("@faker-js/faker");
const purchase_model_1 = require("./purchase.model");
const purchase_detail_model_1 = require("./purchase-detail.model");
const supplier_model_1 = require("../supplier/supplier.model");
const product_model_1 = require("../product/product.model");
const branch_model_1 = require("../branch/branch.model");
/**
 * Seeder de compras.
 * Requiere proveedores, productos y sucursales previamente sembrados.
 */
async function seedPurchases(count) {
    if (count <= 0) {
        console.log("⏭️ purchases: count=0, se omite");
        return 0;
    }
    const existing = await purchase_model_1.Purchase.count();
    if (existing > 0) {
        console.log(`⏭️ purchases: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const suppliers = await supplier_model_1.Supplier.findAll({
        where: { isActive: true },
    });
    const products = await product_model_1.Product.findAll({
        where: { status: "active" },
    });
    const branches = await branch_model_1.Branch.findAll({
        where: { status: "active" },
    });
    if (suppliers.length === 0 ||
        products.length === 0 ||
        branches.length === 0) {
        console.log("⏭️ purchases: no hay proveedores, productos o sucursales activas");
        return 0;
    }
    let inserted = 0;
    for (let i = 0; i < count; i++) {
        const supplier = faker_1.faker.helpers.arrayElement(suppliers);
        const branch = faker_1.faker.helpers.arrayElement(branches);
        const selectedProducts = faker_1.faker.helpers.arrayElements(products, Math.min(3, products.length));
        let subtotal = 0;
        const details = selectedProducts.map((product) => {
            const cantidad = faker_1.faker.number.int({ min: 1, max: 20 });
            const valorUnitario = faker_1.faker.number.int({
                min: 5000,
                max: 100000,
            });
            const total = cantidad * valorUnitario;
            subtotal += total;
            return {
                productId: product.id,
                cantidad,
                valorUnitario,
                total,
                receivedQuantity: 0,
                observaciones: faker_1.faker.commerce.productDescription(),
            };
        });
        const impuestos = Math.round(subtotal * 0.19);
        const total = subtotal + impuestos;
        const purchase = await purchase_model_1.Purchase.create({
            supplierId: supplier.id,
            branchId: branch.id,
            fecha: faker_1.faker.date.recent({ days: 30 }),
            subtotal,
            impuestos,
            total,
            estado: "pending",
        });
        await purchase_detail_model_1.PurchaseDetail.bulkCreate(details.map((detail) => ({
            purchaseId: purchase.id,
            ...detail,
        })));
        inserted++;
    }
    console.log(`✅ purchases: insertadas ${inserted} compras de prueba`);
    return inserted;
}
//# sourceMappingURL=purchase.seeder.js.map