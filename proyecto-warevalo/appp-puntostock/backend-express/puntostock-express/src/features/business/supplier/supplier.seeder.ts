import { faker } from "@faker-js/faker";
import { Supplier } from "./supplier.model";

/**
 * Seeder del feature Supplier (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedSuppliers(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  suppliers: count=0, se omite");
    return 0;
  }

  const existing = await Supplier.count();
  if (existing > 0) {
    console.log(`⏭️  suppliers: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, () => ({
    nit: faker.string.numeric(9) + "-" + faker.string.numeric(1),
    razonSocial: faker.company.name(),
    contacto: faker.person.fullName(),
    telefono: faker.phone.number(),
    email: faker.internet.email(),
    isActive: true,
  }));

  await Supplier.bulkCreate(rows);
  console.log(`✅ suppliers: insertados ${count} registro(s) falsos`);
  return count;
}
