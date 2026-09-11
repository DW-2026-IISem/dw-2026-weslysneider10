import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

import {
  getLoggerConfig,
} from './config/logger/logger.config.js';

import {
  GlobalExceptionFilter,
} from './common/filters/global-exception.filter.js';

import {
  SequelizeExceptionFilter,
} from './common/filters/sequelize-exception.filter.js';

import {
  ResponseInterceptor,
} from './common/interceptors/response.interceptor.js';

import {
  LoggingInterceptor,
} from './common/interceptors/logging.interceptor.js';

import {
  TimeoutInterceptor,
} from './common/interceptors/timeout.interceptor.js';

import {
  CustomValidationPipe,
} from './common/pipes/validation.pipe.js';

import {
  setupSwagger,
} from './config/swagger/swagger.config.js';

import {
  GLOBAL_PREFIX,
  APP_PORT,
} from './common/constants/app.constants.js';

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
