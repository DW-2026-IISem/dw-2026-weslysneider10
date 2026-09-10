import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import {
  getLoggerConfig,
} from './config/logger/logger.config';

import {
  GlobalExceptionFilter,
} from './common/filters/global-exception.filter';

import {
  SequelizeExceptionFilter,
} from './common/filters/sequelize-exception.filter';

import {
  ResponseInterceptor,
} from './common/interceptors/response.interceptor';

import {
  LoggingInterceptor,
} from './common/interceptors/logging.interceptor';

import {
  TimeoutInterceptor,
} from './common/interceptors/timeout.interceptor';

import {
  CustomValidationPipe,
} from './common/pipes/validation.pipe';

import {
  setupSwagger,
} from './config/swagger/swagger.config';

import {
  GLOBAL_PREFIX,
  APP_PORT,
} from './common/constants/app.constants';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      logger:
        getLoggerConfig().logLevels,
    },
  );

  app.setGlobalPrefix(
    GLOBAL_PREFIX,
  );

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new SequelizeExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(),
    new TimeoutInterceptor(),
  );

  app.useGlobalPipes(
    new CustomValidationPipe(),
  );

  setupSwagger(app);

  const port = APP_PORT;

  try {
    await app.listen(port);

    console.log(
      `🚀 PuntoStock ejecutándose en: http://localhost:${port}`,
    );

    console.log(
      `📘 Swagger: http://localhost:${port}/api/docs`,
    );
  } catch (error: any) {
    if (error?.code === 'EADDRINUSE') {
      console.error(
        `❌ El puerto ${port} ya está en uso.`,
      );

      await app.close();

      process.exit(1);
    }

    throw error;
  }
}

bootstrap();
