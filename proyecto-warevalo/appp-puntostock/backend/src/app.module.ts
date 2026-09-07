import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from './config/config.module.js';
import { SequelizeModule } from './infrastructure/database/sequelize/sequelize.module.js';
import { HealthController } from './health/health.controller.js';
import { HealthService } from './health/health.service.js';
import { BusinessModule } from './features/business/business.module.js';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule,
    BusinessModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
