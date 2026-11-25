"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = exports.ENV_CONFIG_NAME = void 0;
const config_1 = require("@nestjs/config");
const db_env_js_1 = require("./db-env.js");
const env_interface_js_1 = require("./env.interface.js");
const env_validation_js_1 = require("./env.validation.js");
exports.ENV_CONFIG_NAME = 'environment';
exports.envConfig = (0, config_1.registerAs)(exports.ENV_CONFIG_NAME, () => {
    const validated = (0, env_validation_js_1.validate)(process.env);
    return {
        app: {
            port: validated.PORT,
            nodeEnv: validated.NODE_ENV ?? env_interface_js_1.Environment.Development,
        },
        database: (0, db_env_js_1.resolveDialectCredentials)(validated),
        jwt: {
            secret: validated.JWT_SECRET,
            expiresIn: validated.JWT_EXPIRES_IN,
            refreshSecret: validated.JWT_REFRESH_SECRET,
            refreshExpiresIn: validated.JWT_REFRESH_EXPIRES_IN,
        },
    };
});
//# sourceMappingURL=env.config.js.map