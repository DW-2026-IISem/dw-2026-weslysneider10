import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { seedBranches } from '../../../features/business/branches/infrastructure/persistence/seeders/branches.seeder';
import { seedProducts } from '../../../features/business/products/infrastructure/persistence/seeders/products.seeder';
// import { seedProviders } from '...';
// import { seedPurchases } from '...';
// import { seedClients } from '...';
// import { seedSales } from '...';
// import { seedPayments } from '...';
// import { seedReturns } from '...';
import { seedInventory } from '../../../features/business/inventory/infrastructure/persistence/seeders/inventory.seeder';

/**
 * Ejecuta seeders en orden de dependencias.
 * Solo en entornos no productivos.
 */
@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederService.name);

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    try {
      await seedBranches();
      await seedProducts();
      // await seedProviders();
      // await seedPurchases();
      // await seedClients();
      // await seedSales();
      // await seedPayments();
      // await seedReturns();
      await seedInventory();
      this.logger.log('✅ Seeders ejecutados');
    } catch (error: any) {
      this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);
      throw error;
    }
  }
}
