"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DB_PORTS = void 0;
exports.resolveDialectCredentials = resolveDialectCredentials;
exports.assertActiveDialectCredentials = assertActiveDialectCredentials;
const env_interface_js_1 = require("./env.interface.js");
exports.DEFAULT_DB_PORTS = {
    [env_interface_js_1.DatabaseDialect.MySQL]: 3306,
    [env_interface_js_1.DatabaseDialect.Postgres]: 5432,
    [env_interface_js_1.DatabaseDialect.MSSQL]: 1433,
    [env_interface_js_1.DatabaseDialect.Oracle]: 1521,
};
function toPort(value, fallback) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = parseInt(value, 10);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }
    return fallback;
}
function text(value) {
    return value?.trim() ?? '';
}
function resolveDialectCredentials(env) {
    const dialect = env.DB_DIALECT;
    const port = exports.DEFAULT_DB_PORTS[dialect];
    switch (dialect) {
        case env_interface_js_1.DatabaseDialect.MySQL:
            return {
                dialect,
                host: text(env.DB_MYSQL_HOST),
                port: toPort(env.DB_MYSQL_PORT, port),
                username: text(env.DB_MYSQL_USERNAME),
                password: text(env.DB_MYSQL_PASSWORD),
                database: text(env.DB_MYSQL_NAME),
            };
        case env_interface_js_1.DatabaseDialect.Postgres:
            return {
                dialect,
                host: text(env.DB_POSTGRES_HOST),
                port: toPort(env.DB_POSTGRES_PORT, port),
                username: text(env.DB_POSTGRES_USERNAME),
                password: text(env.DB_POSTGRES_PASSWORD),
                database: text(env.DB_POSTGRES_NAME),
            };
        case env_interface_js_1.DatabaseDialect.MSSQL:
            return {
                dialect,
                host: text(env.DB_MSSQL_HOST),
                port: toPort(env.DB_MSSQL_PORT, port),
                username: text(env.DB_MSSQL_USERNAME),
                password: text(env.DB_MSSQL_PASSWORD),
                database: text(env.DB_MSSQL_NAME),
            };
        case env_interface_js_1.DatabaseDialect.Oracle:
            return {
                dialect,
                host: text(env.DB_ORACLE_HOST),
                port: toPort(env.DB_ORACLE_PORT, port),
                username: text(env.DB_ORACLE_USERNAME),
                password: text(env.DB_ORACLE_PASSWORD),
                database: text(env.DB_ORACLE_NAME),
                connectString: text(env.DB_ORACLE_CONNECT_STRING) || undefined,
            };
        default:
            throw new Error(`Error de configuración: DB_DIALECT inválido. Use mysql, postgres, mssql u oracle.`);
    }
}
function assertActiveDialectCredentials(config) {
    const prefix = {
        [env_interface_js_1.DatabaseDialect.MySQL]: 'DB_MYSQL',
        [env_interface_js_1.DatabaseDialect.Postgres]: 'DB_POSTGRES',
        [env_interface_js_1.DatabaseDialect.MSSQL]: 'DB_MSSQL',
        [env_interface_js_1.DatabaseDialect.Oracle]: 'DB_ORACLE',
    };
    const tag = prefix[config.dialect];
    const missing = [];
    if (!config.host)
        missing.push(`${tag}_HOST`);
    if (!config.username)
        missing.push(`${tag}_USERNAME`);
    if (!config.database)
        missing.push(`${tag}_NAME`);
    if (config.dialect === env_interface_js_1.DatabaseDialect.Oracle && !config.connectString) {
        missing.push('DB_ORACLE_CONNECT_STRING');
    }
    if (missing.length > 0) {
        throw new Error(`Error de configuración: variable(s) crítica(s) inválida(s) o ausente(s) para ${config.dialect}: ${missing.join(', ')}. Completa el bloque de ese motor en .env (no commitees secretos).`);
    }
}
//# sourceMappingURL=db-env.js.map