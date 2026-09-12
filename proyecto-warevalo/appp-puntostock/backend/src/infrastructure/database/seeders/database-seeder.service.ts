import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { seedClients } from '../../../features/business/clients/infrastructure/persistence/seeders/clients.seeder';

import { seedProductTypes } from '../../../features/business/product-types/infrastructure/persistence/seeders/product-types.seeder';

@Injectable()
export class DatabaseSeederService
  implements OnModuleInit
{
  private readonly logger = new Logger(
    DatabaseSeederService.name,
  );

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    try {
      await seedClients();

      await seedProductTypes();

      this.logger.log(
        '✅ Seeders ejecutados correctamente',
      );
    } catch (error: any) {
      this.logger.error(
        `❌ Error ejecutando seeders: ${error.message}`,
        error.stack,
      );

      throw error;
    }
  }
}
