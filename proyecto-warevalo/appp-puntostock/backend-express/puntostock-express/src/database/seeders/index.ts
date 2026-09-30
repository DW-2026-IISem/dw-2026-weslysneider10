import dotenv from "dotenv";

import { sequelize, testConnection } from "../db";

import "../../features/business/client/client.model";
import "../../features/business/product-type/product-type.model";
import "../../features/business/product/product.model";
import "../../features/business/product/product.associations";
import "../../features/business/branch/branch.model";
import "../../features/business/supplier/supplier.model";
import "../../features/business/inventory/inventory.model";
import "../../features/business/purchase/purchase.model";

import { seedClients } from "../../features/business/client/client.seeder";
import { seedProductTypes } from "../../features/business/product-type/product-type.seeder";
import { seedProducts } from "../../features/business/product/product.seeder";
import { seedBranches } from "../../features/business/branch/branch.seeder";
import { seedSuppliers } from "../../features/business/supplier/supplier.seeder";
import { seedInventories } from "../../features/business/inventory/inventory.seeder";
import { seedPurchases } from "../../features/business/purchase/purchase.seeder";

import { resolveSeedCounts } from "./counts";

dotenv.config();

export async function runAllSeeders(): Promise<void> {

  const counts = resolveSeedCounts();

  console.log("🌱 Iniciando SeedersRunner...");
  console.log("📊 Conteos:", counts);

  const ok = await testConnection();

  if (!ok) {
    throw new Error("No hay conexión a la base de datos");
  }

  await sequelize.sync({
    force: false,
  });

  // Orden respetando dependencias
  await seedClients(counts.clients);
  await seedProductTypes(counts.product_types);
  await seedProducts(counts.products);
  await seedBranches(counts.branches);
  await seedSuppliers(counts.suppliers);
  await seedInventories(counts.inventories);
  await seedPurchases(counts.purchases);

  console.log("🌱 SeedersRunner finalizado");
}

if (require.main === module) {

  runAllSeeders()
    .then(async () => {
      await sequelize.close();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error("❌ Error en seeders:", err);

      await sequelize.close();

      process.exit(1);
    });
}
