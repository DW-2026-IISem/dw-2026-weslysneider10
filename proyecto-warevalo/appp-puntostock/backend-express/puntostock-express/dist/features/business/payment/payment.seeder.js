"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPayments = seedPayments;
const faker_1 = require("@faker-js/faker");
const payment_model_1 = require("./payment.model");
const sale_model_1 = require("../sale/sale.model");
async function seedPayments(count) {
    if (count <= 0) {
        console.log("⏭️ payments: count=0, se omite");
        return 0;
    }
    const existing = await payment_model_1.Payment.count();
    if (existing > 0) {
        console.log(`⏭️ payments: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const sales = await sale_model_1.Sale.findAll();
    if (sales.length === 0) {
        console.log("⏭️ payments: no hay ventas disponibles");
        return 0;
    }
    const metodos = [
        "cash",
        "card",
        "transfer",
    ];
    const rows = Array.from({ length: count }, () => {
        const sale = faker_1.faker.helpers.arrayElement(sales);
        return {
            saleId: sale.id,
            metodo: faker_1.faker.helpers.arrayElement(metodos),
            monto: Number(faker_1.faker.commerce.price({ min: 5000, max: 300000, dec: 0 })),
            fecha: faker_1.faker.date.recent({ days: 30 }),
            estado: "completed",
        };
    });
    await payment_model_1.Payment.bulkCreate(rows);
    console.log(`✅ payments: insertados ${rows.length} registro(s)`);
    return rows.length;
}
//# sourceMappingURL=payment.seeder.js.map