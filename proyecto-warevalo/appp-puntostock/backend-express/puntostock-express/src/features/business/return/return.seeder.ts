import { faker } from "@faker-js/faker";
import { Return } from "./return.model";
import { SaleDetail } from "../sale/sale-detail.model";

/**
 * Seeder del feature Return.
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Requiere SaleDetails ya sembrados (de la fase Venta). Crea devoluciones
 * en estado "pending" (no toca Inventory; eso requiere aprobación explícita
 * por endpoint, igual que haría un usuario real).
 *
 * Idempotente.
 */
export async function seedReturns(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  returns: count=0, se omite");
    return 0;
  }

  const existing = await Return.count();
  if (existing > 0) {
    console.log(`⏭️  returns: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const saleDetails = await SaleDetail.findAll();
  if (saleDetails.length === 0) {
    console.log("⏭️  returns: no hay sale_details, se omite seeder");
    return 0;
  }

  const motivos = [
    "Producto defectuoso",
    "Producto equivocado",
    "Cliente se arrepintió",
    "Empaque dañado",
    "No era lo esperado",
  ];

  let created = 0;

  for (let i = 0; i < count; i++) {
    const detail = saleDetails[Math.floor(Math.random() * saleDetails.length)];
    const cantidad = Math.min(detail.cantidad, Math.floor(Math.random() * 2) + 1);

    if (cantidad <= 0) continue;

    await Return.create({
      saleDetailId: detail.id,
      fecha: faker.date.recent({ days: 15 }),
      motivo: motivos[Math.floor(Math.random() * motivos.length)],
      cantidad,
      total: cantidad * Number(detail.valorUnitario),
      estado: "pending",
    });

    created++;
  }

  console.log(`✅ returns: insertados ${created} registro(s)`);
  return created;
}
