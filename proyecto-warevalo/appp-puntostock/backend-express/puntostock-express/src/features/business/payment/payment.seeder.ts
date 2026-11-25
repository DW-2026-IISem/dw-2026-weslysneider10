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

  // Solo ventas completadas: una venta cancelada no admite pagos.
  const sales = await Sale.findAll({ where: { estado: "completed" } });

  if (sales.length === 0) {
    console.log("⏭️ payments: no hay ventas completadas disponibles");
    return 0;
  }

  const metodos: Array<"cash" | "card" | "transfer"> = [
    "cash",
    "card",
    "transfer",
  ];

  // Regla de negocio: lo pagado no puede superar el total de la venta.
  // Se genera como máximo un pago por venta, por el total exacto
  // (la venta queda saldada).
  const selected = faker.helpers.arrayElements(sales, Math.min(count, sales.length));

  const rows = selected.map((sale) => ({
    saleId: sale.id,
    metodo: faker.helpers.arrayElement(metodos),
    monto: Number(sale.total),
    fecha: sale.fecha,
    estado: "completed" as const,
  }));

  await Payment.bulkCreate(rows);

  console.log(`✅ payments: insertados ${rows.length} registro(s)`);
  return rows.length;
}
