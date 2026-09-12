import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder';
import { seedProductTypes } from '../../../features/business/product-types/infrastructure/persistence/seeders/product-types.seeder';
import { seedProducts } from '../../../features/business/products/infrastructure/persistence/seeders/products.seeder';
import { seedSales } from '../../../features/business/sales/infrastructure/persistence/seeders/sales.seeder';
import { seedBranches } from '../../../features/business/branches/infrastructure/persistence/seeders/branches.seeder';
import { seedSuppliers } from '../../../features/business/suppliers/infrastructure/persistence/seeders/suppliers.seeder';
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
      await seedClients();
      await seedProductTypes();
      await seedProducts();
      await seedBranches();
      await seedSuppliers();
      await seedSales();
      await seedInventory();
      this.logger.log('✅ Seeders ejecutados');
    } catch (error: any) {
      this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);
      throw error;
    }
  }
}
