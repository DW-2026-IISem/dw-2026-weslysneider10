import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface.js';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case.js';
import { GetClientUseCase } from './application/use-cases/get-client.use-case.js';
import { ClientModel } from './infrastructure/persistence/models/client.model.js';
import { SequelizeClientRepository } from './infrastructure/persistence/repositories/client.repository.js';
import { ClientsController } from './presentation/http/controllers/clients.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([ClientModel])],
  controllers: [ClientsController],
  providers: [
    CreateClientUseCase,
    GetClientUseCase,
    {
      provide: CLIENT_REPOSITORY,
      useClass: SequelizeClientRepository,
    },
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientsModule {}
