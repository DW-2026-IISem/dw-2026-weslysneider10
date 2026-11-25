"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const swagger_constants_js_1 = require("./swagger.constants.js");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(swagger_constants_js_1.SWAGGER_TITLE)
        .setDescription(swagger_constants_js_1.SWAGGER_DESCRIPTION)
        .setVersion(swagger_constants_js_1.SWAGGER_VERSION)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(swagger_constants_js_1.SWAGGER_PATH, app, document);
}
//# sourceMappingURL=swagger.config.js.map