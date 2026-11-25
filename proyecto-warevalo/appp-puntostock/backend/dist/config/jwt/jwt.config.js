"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const config_1 = require("@nestjs/config");
const jwt_constants_js_1 = require("./jwt.constants.js");
exports.jwtConfig = (0, config_1.registerAs)(jwt_constants_js_1.JWT_CONFIG_NAME, () => ({
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || jwt_constants_js_1.JWT_DEFAULTS.EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || jwt_constants_js_1.JWT_DEFAULTS.REFRESH_EXPIRES_IN,
}));
//# sourceMappingURL=jwt.config.js.map