import dotenv from "dotenv";

import { sequelize, testConnection } from "../db";

import "../../features/business/client/client.model";
import "../../features/business/product-type/product-type.model";
import "../../features/business/product/product.model";
import "../../features/business/product/product.associations";
import "../../features/business/branch/branch.model";
import "../../features/business/supplier/supplier.model";
import "../../features/business/inventory/inventory.model";
import "../../features/business/payment/payment.model";
import "../../features/business/purchase/purchase.model";
import "../../features/business/purchase/purchase-detail.model";
import "../../features/business/purchase/purchase.associations";
import "../../features/business/sale/sale.model";
import "../../features/business/sale/sale-detail.model";
import "../../features/business/sale/sale.associations";
import "../../features/business/return/return.model";

// Fase II — Auth con RBAC (los seeders de estas tablas llegan en ISS-10/11/12;
// por ahora solo se registran los modelos para que `sync` cree las tablas).
import "../../features/auth/user/user.model";
import "../../features/auth/role/role.model";
import "../../features/auth/resource/resource.model";
import "../../features/auth/role-user/role-user.model";
import "../../features/auth/resource-role/resource-role.model";
import "../../features/auth/refresh-token/refresh-token.model";
import "../../features/auth/rbac.associations";

import { seedClients } from "../../features/business/client/client.seeder";
import { seedProductTypes } from "../../features/business/product-type/product-type.seeder";
import { seedProducts } from "../../features/business/product/product.seeder";
import { seedBranches } from "../../features/business/branch/branch.seeder";
import { seedSuppliers } from "../../features/business/supplier/supplier.seeder";
import { seedInventories } from "../../features/business/inventory/inventory.seeder";
import { seedPayments } from "../../features/business/payment/payment.seeder";
import { seedPurchases } from "../../features/business/purchase/purchase.seeder";
import { seedSales } from "../../features/business/sale/sale.seeder";
import { seedReturns } from "../../features/business/return/return.seeder";

import { resolveSeedCounts } from "./counts";

dotenv.config();

/**
 * SeedersRunner — ejecuta TODOS los seeders de features.
 *
 * Ubicación:
 * `src/database/seeders/`
 *
 * Uso:
 *   npm run db:seed
 *   npm run db:seed -- --clients=20
 *   SEED_CLIENTS=5 npm run db:seed
 */
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

  // Orden: business (respeta dependencias FK)
  // Fase II (roles, resources, users, etc.) se suma aquí cuando lleguemos a ISS-10/11/12.
  await seedClients(counts.clients);
  await seedProductTypes(counts.product_types);
  await seedProducts(counts.products);
  await seedBranches(counts.branches);
  await seedSuppliers(counts.suppliers);
  await seedInventories(counts.inventories);
  await seedPayments(counts.payments);
  await seedPurchases(counts.purchases);
  await seedSales(counts.sales);
  await seedReturns(counts.returns);

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
