import { Inventory } from "./inventory.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";

/**
 * Seeder del feature Inventory.
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Requiere Sucursales y Productos ya sembrados. Idempotente.
 */
export async function seedInventories(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  inventories: count=0, se omite");
    return 0;
  }

  const existing = await Inventory.count();
  if (existing > 0) {
    console.log(`⏭️  inventories: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const branches = await Branch.findAll({ where: { status: "active" } });
  const products = await Product.findAll({ where: { status: "active" } });

  if (branches.length === 0 || products.length === 0) {
    console.log("⏭️  inventories: no hay sucursales o productos, se omite seeder");
    return 0;
  }

  const combos: Array<{ branchId: number; productId: number }> = [];
  for (const branch of branches) {
    for (const product of products) {
      combos.push({ branchId: branch.id, productId: product.id });
    }
  }

  const selected = combos.slice(0, count);

  const rows = selected.map((combo) => ({
    branchId: combo.branchId,
    productId: combo.productId,
    quantity: Math.floor(Math.random() * 50) + 1,
    minStock: 5,
  }));

  await Inventory.bulkCreate(rows);
  console.log(`✅ inventories: insertados ${rows.length} registro(s)`);
  return rows.length;
}
