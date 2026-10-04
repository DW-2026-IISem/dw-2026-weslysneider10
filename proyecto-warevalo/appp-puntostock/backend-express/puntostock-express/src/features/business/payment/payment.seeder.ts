import { faker } from "@faker-js/faker";
import { Payment } from "./payment.model";

/**
 * Seeder del feature Payment (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * NOTA: referenciaId apunta a ids 1..N "a futuro" (Venta/Compra aún no existen
 * como tabla real al momento de este seeder). Cuando se construya Venta,
 * ajustar este seeder para tomar ids reales de VentaModel.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedPayments(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  payments: count=0, se omite");
    return 0;
  }

  const existing = await Payment.count();
  if (existing > 0) {
    console.log(`⏭️  payments: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const metodos: Array<"efectivo" | "tarjeta" | "transferencia" | "mixto"> = [
    "efectivo",
    "tarjeta",
    "transferencia",
    "mixto",
  ];

  const rows = Array.from({ length: count }, () => ({
    referenciaTipo: "venta" as const,
    referenciaId: faker.number.int({ min: 1, max: 20 }),
    metodo: metodos[Math.floor(Math.random() * metodos.length)],
    monto: Number(faker.commerce.price({ min: 5000, max: 300000, dec: 0 })),
    fecha: faker.date.recent({ days: 30 }),
    estado: "completed" as const,
  }));

  await Payment.bulkCreate(rows);
  console.log(`✅ payments: insertados ${count} registro(s) falsos`);
  return count;
}
