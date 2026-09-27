import dotenv from "dotenv";

import { sequelize, testConnection } from "../db";

import "../../features/business/client/client.model";

import { seedClients } from "../../features/business/client/client.seeder";

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
    alter: true,
  });

  // Orden: business
  await seedClients(counts.clients);

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
