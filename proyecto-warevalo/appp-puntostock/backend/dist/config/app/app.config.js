"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
const app_constants_js_1 = require("./app.constants.js");
exports.appConfig = (0, config_1.registerAs)(app_constants_js_1.APP_CONFIG_NAME, () => ({
    port: parseInt(process.env.PORT || String(app_constants_js_1.APP_DEFAULTS.PORT), 10),
    nodeEnv: process.env.NODE_ENV || app_constants_js_1.APP_DEFAULTS.NODE_ENV,
}));
//# sourceMappingURL=app.config.js.map