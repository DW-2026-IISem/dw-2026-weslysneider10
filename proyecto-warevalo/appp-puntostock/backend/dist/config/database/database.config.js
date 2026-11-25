"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = exports.DATABASE_CONFIG_NAME = void 0;
const config_1 = require("@nestjs/config");
const db_env_js_1 = require("../environment/db-env.js");
const env_interface_js_1 = require("../environment/env.interface.js");
exports.DATABASE_CONFIG_NAME = 'database';
const dialectModuleMap = {
    [env_interface_js_1.DatabaseDialect.MySQL]: 'mysql2',
    [env_interface_js_1.DatabaseDialect.Postgres]: 'pg',
    [env_interface_js_1.DatabaseDialect.MSSQL]: 'tedious',
    [env_interface_js_1.DatabaseDialect.Oracle]: 'oracledb',
};
exports.databaseConfig = (0, config_1.registerAs)(exports.DATABASE_CONFIG_NAME, () => {
    const dialect = process.env.DB_DIALECT || env_interface_js_1.DatabaseDialect.MySQL;
    const credentials = (0, db_env_js_1.resolveDialectCredentials)({
        DB_DIALECT: dialect,
        ...process.env,
    });
    return {
        ...credentials,
        dialectModulePath: dialectModuleMap[dialect],
        autoLoadModels: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    };
});
//# sourceMappingURL=database.config.js.map