import { faker } from "@faker-js/faker";
import { Payment } from "./payment.model";
import { Sale } from "../sale/sale.model";

export async function seedPayments(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️ payments: count=0, se omite");
    return 0;
  }

  const existing = await Payment.count();

  if (existing > 0) {
    console.log(`⏭️ payments: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const sales = await Sale.findAll();

  if (sales.length === 0) {
    console.log("⏭️ payments: no hay ventas disponibles");
    return 0;
  }

  const metodos: Array<"cash" | "card" | "transfer"> = [
    "cash",
    "card",
    "transfer",
  ];

  const rows = Array.from({ length: count }, () => {
    const sale = faker.helpers.arrayElement(sales);

    return {
      saleId: sale.id,
      metodo: faker.helpers.arrayElement(metodos),
      monto: Number(
        faker.commerce.price({ min: 5000, max: 300000, dec: 0 })
      ),
      fecha: faker.date.recent({ days: 30 }),
      estado: "completed" as const,
    };
  });

  await Payment.bulkCreate(rows);

  console.log(`✅ payments: insertados ${rows.length} registro(s)`);
  return rows.length;
}
