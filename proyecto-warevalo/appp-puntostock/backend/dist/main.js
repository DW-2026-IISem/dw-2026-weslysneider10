"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_js_1 = require("./app.module.js");
const logger_config_js_1 = require("./config/logger/logger.config.js");
const global_exception_filter_js_1 = require("./common/filters/global-exception.filter.js");
const sequelize_exception_filter_js_1 = require("./common/filters/sequelize-exception.filter.js");
const response_interceptor_js_1 = require("./common/interceptors/response.interceptor.js");
const logging_interceptor_js_1 = require("./common/interceptors/logging.interceptor.js");
const timeout_interceptor_js_1 = require("./common/interceptors/timeout.interceptor.js");
const validation_pipe_js_1 = require("./common/pipes/validation.pipe.js");
const swagger_config_js_1 = require("./config/swagger/swagger.config.js");
const app_constants_js_1 = require("./common/constants/app.constants.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule, {
        logger: (0, logger_config_js_1.getLoggerConfig)().logLevels,
    });
    app.setGlobalPrefix(app_constants_js_1.GLOBAL_PREFIX);
    app.useGlobalFilters(new global_exception_filter_js_1.GlobalExceptionFilter(), new sequelize_exception_filter_js_1.SequelizeExceptionFilter());
    app.useGlobalInterceptors(new response_interceptor_js_1.ResponseInterceptor(), new logging_interceptor_js_1.LoggingInterceptor(), new timeout_interceptor_js_1.TimeoutInterceptor());
    app.useGlobalPipes(new validation_pipe_js_1.CustomValidationPipe());
    (0, swagger_config_js_1.setupSwagger)(app);
    const port = app_constants_js_1.APP_PORT;
    try {
        await app.listen(port);
        console.log(`🚀 PuntoStock ejecutándose en: http://localhost:${port}`);
        console.log(`📘 Swagger: http://localhost:${port}/api/docs`);
    }
    catch (error) {
        if (error?.code === 'EADDRINUSE') {
            console.error(`❌ El puerto ${port} ya está en uso.`);
            await app.close();
            process.exit(1);
        }
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map