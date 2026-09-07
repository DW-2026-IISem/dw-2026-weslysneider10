import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    NestSequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const allowed = ['postgres'] as const;
        const dialect = config.get<string>('DB_DIALECT');
        if (!dialect || !allowed.includes(dialect as (typeof allowed)[number])) {
          throw new Error('DB_DIALECT debe ser postgres (motor definido para PuntoStock)');
        }
        return {
          dialect: dialect as 'postgres',
          host: config.getOrThrow<string>('DB_HOST'),
          port: Number(config.getOrThrow<string>('DB_PORT')),
          username: config.getOrThrow<string>('DB_USERNAME'),
          password: config.getOrThrow<string>('DB_PASSWORD'),
          database: config.getOrThrow<string>('DB_NAME'),
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [NestSequelizeModule],
})
export class SequelizeModule {}
