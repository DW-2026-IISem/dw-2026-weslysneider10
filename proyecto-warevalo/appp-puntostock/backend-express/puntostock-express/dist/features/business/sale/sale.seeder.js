"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSales = seedSales;
const sale_model_1 = require("./sale.model");
const sale_detail_model_1 = require("./sale-detail.model");
const client_model_1 = require("../client/client.model");
const branch_model_1 = require("../branch/branch.model");
const inventory_model_1 = require("../inventory/inventory.model");
/**
 * Seeder del feature Sale (cabecera + detalle).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Requiere Clients, Branches e Inventories ya sembrados (toma stock real
 * y lo descuenta, igual que haría el endpoint). Idempotente.
 */
async function seedSales(count) {
    if (count <= 0) {
        console.log("⏭️  sales: count=0, se omite");
        return 0;
    }
    const existing = await sale_model_1.Sale.count();
    if (existing > 0) {
        console.log(`⏭️  sales: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const clients = await client_model_1.Client.findAll({ where: { status: "active" } });
    const branches = await branch_model_1.Branch.findAll({ where: { status: "active" } });
    if (clients.length === 0 || branches.length === 0) {
        console.log("⏭️  sales: faltan clients/branches, se omite seeder");
        return 0;
    }
    let created = 0;
    for (let i = 0; i < count; i++) {
        const client = clients[Math.floor(Math.random() * clients.length)];
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const inventory = await inventory_model_1.Inventory.findOne({
            where: { branchId: branch.id },
        });
        if (!inventory || inventory.quantity <= 0) {
            continue;
        }
        const cantidad = Math.min(inventory.quantity, Math.floor(Math.random() * 3) + 1);
        const valorUnitario = 10000;
        const subtotal = cantidad * valorUnitario;
        const impuestos = Math.round(subtotal * 0.19);
        const total = subtotal + impuestos;
        const sale = await sale_model_1.Sale.create({
            clientId: client.id,
            branchId: branch.id,
            fecha: new Date(),
            subtotal,
            impuestos,
            total,
            estado: "completed",
        });
        await sale_detail_model_1.SaleDetail.create({
            saleId: sale.id,
            productId: inventory.productId,
            cantidad,
            valorUnitario,
            total: subtotal,
        });
        await inventory.update({ quantity: inventory.quantity - cantidad });
        created++;
    }
    console.log(`✅ sales: insertados ${created} registro(s)`);
    return created;
}
//# sourceMappingURL=sale.seeder.js.map