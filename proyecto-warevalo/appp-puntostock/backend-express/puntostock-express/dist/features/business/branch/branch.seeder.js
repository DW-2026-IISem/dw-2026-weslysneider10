"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBranches = seedBranches;
const faker_1 = require("@faker-js/faker");
const branch_model_1 = require("./branch.model");
/**
 * Seeder del feature Branch (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedBranches(count) {
    if (count <= 0) {
        console.log("⏭️  branches: count=0, se omite");
        return 0;
    }
    const existing = await branch_model_1.Branch.count();
    if (existing > 0) {
        console.log(`⏭️  branches: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, () => ({
        name: `Sucursal ${faker_1.faker.location.city()}`,
        description: faker_1.faker.company.catchPhrase(),
        status: "active",
    }));
    await branch_model_1.Branch.bulkCreate(rows);
    console.log(`✅ branches: insertados ${count} registro(s) falsos`);
    return count;
}
//# sourceMappingURL=branch.seeder.js.map