import dotenv from "dotenv";

import { sequelize, testConnection } from "../db";

// ============================================================
// MODELOS BUSINESS
// ============================================================

import "../../features/business/client/client.model";
import "../../features/business/product-type/product-type.model";

import "../../features/business/product/product.model";
import "../../features/business/product/product.associations";

import "../../features/business/branch/branch.model";
import "../../features/business/supplier/supplier.model";
import "../../features/business/inventory/inventory.model";

import "../../features/business/payment/payment.model";

import "../../features/business/purchase/purchase.model";
import "../../features/business/purchase/purchase.associations";

import "../../features/business/sale/sale.model";
import "../../features/business/sale/sale-detail.model";
import "../../features/business/sale/sale.associations";

import "../../features/business/return/return.model";

// ============================================================
// MODELOS AUTH / RBAC
// ============================================================

import "../../features/auth/user/user.model";
import "../../features/auth/role/role.model";
import "../../features/auth/resource/resource.model";
import "../../features/auth/role-user/role-user.model";
import "../../features/auth/resource-role/resource-role.model";
import "../../features/auth/refresh-token/refresh-token.model";
import "../../features/auth/rbac.associations";

// ============================================================
// SEEDERS BUSINESS
// ============================================================

import { seedClients } from "../../features/business/client/client.seeder";
import { seedProductTypes } from "../../features/business/product-type/product-type.seeder";
import { seedProducts } from "../../features/business/product/product.seeder";
import { seedBranches } from "../../features/business/branch/branch.seeder";
import { seedSuppliers } from "../../features/business/supplier/supplier.seeder";
import { seedInventories } from "../../features/business/inventory/inventory.seeder";
import { seedPurchases } from "../../features/business/purchase/purchase.seeder";
import { seedSales } from "../../features/business/sale/sale.seeder";
import { seedPayments } from "../../features/business/payment/payment.seeder";
import { seedReturns } from "../../features/business/return/return.seeder";

// ============================================================
// SEEDERS AUTH / RBAC
// ============================================================

import { seedRoles } from "../../features/auth/role/role.seeder";
import { seedResources } from "../../features/auth/resource/resource.seeder";
import { seedUsers } from "../../features/auth/user/user.seeder";
import { seedRoleUsers } from "../../features/auth/role-user/role-user.seeder";
import { seedResourceRoles } from "../../features/auth/resource-role/resource-role.seeder";

import { resolveSeedCounts } from "./counts";

dotenv.config();

/**
 * Ejecuta todos los seeders del proyecto.
 *
 * Orden:
 *
 * 1. Roles
 * 2. Resources
 * 3. Users
 * 4. RoleUsers
 * 5. ResourceRoles
 * 6. Datos Business respetando FK
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

  // ==========================================================
  // AUTH / RBAC
  // ==========================================================

  console.log("🔐 Sembrando seguridad RBAC...");

  await seedRoles();
  await seedResources();
  await seedUsers(counts.users);
  await seedRoleUsers();
  await seedResourceRoles();

  console.log("✅ Seguridad RBAC inicializada");

  // ==========================================================
  // BUSINESS
  // ==========================================================

  console.log("🏪 Sembrando datos de negocio...");

  await seedClients(counts.clients);
  await seedProductTypes(counts.product_types);
  await seedProducts(counts.products);
  await seedBranches(counts.branches);
  await seedSuppliers(counts.suppliers);
  await seedInventories(counts.inventories);

  // Purchase depende de Supplier + Product
  await seedPurchases(counts.purchases);

  // Sale depende de Client + Branch + Product
  await seedSales(counts.sales);

  // Payment depende de Sale
  await seedPayments(counts.payments);

  // Return depende de SaleDetail
  await seedReturns(counts.returns);

  console.log("🌱 SeedersRunner finalizado correctamente");
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
