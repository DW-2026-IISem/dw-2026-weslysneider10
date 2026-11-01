"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuppliers = seedSuppliers;
const faker_1 = require("@faker-js/faker");
const supplier_model_1 = require("./supplier.model");
/**
 * Seeder del feature Supplier (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedSuppliers(count) {
    if (count <= 0) {
        console.log("⏭️  suppliers: count=0, se omite");
        return 0;
    }
    const existing = await supplier_model_1.Supplier.count();
    if (existing > 0) {
        console.log(`⏭️  suppliers: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, () => ({
        nit: faker_1.faker.string.numeric(9) + "-" + faker_1.faker.string.numeric(1),
        razonSocial: faker_1.faker.company.name(),
        contacto: faker_1.faker.person.fullName(),
        telefono: faker_1.faker.phone.number(),
        email: faker_1.faker.internet.email(),
        isActive: true,
    }));
    await supplier_model_1.Supplier.bulkCreate(rows);
    console.log(`✅ suppliers: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=supplier.seeder.js.map