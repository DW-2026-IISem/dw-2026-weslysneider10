"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeOptions = getSequelizeOptions;
const db_env_js_1 = require("../../../config/environment/db-env.js");
const env_interface_js_1 = require("../../../config/environment/env.interface.js");
function getSequelizeOptions(dialect) {
    const credentials = (0, db_env_js_1.resolveDialectCredentials)({
        DB_DIALECT: dialect,
        ...process.env,
    });
    const base = {
        dialect: dialect,
        host: credentials.host,
        port: credentials.port,
        username: credentials.username,
        password: credentials.password,
        database: credentials.database,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        define: {
            underscored: false,
            freezeTableName: true,
        },
    };
    switch (dialect) {
        case env_interface_js_1.DatabaseDialect.MSSQL:
            return {
                ...base,
                dialectOptions: {
                    options: {
                        encrypt: true,
                        trustServerCertificate: true,
                    },
                },
            };
        case env_interface_js_1.DatabaseDialect.Oracle:
            return {
                ...base,
                dialectOptions: {
                    connectString: credentials.connectString,
                },
            };
        default:
            return base;
    }
}
//# sourceMappingURL=sequelize.options.js.map