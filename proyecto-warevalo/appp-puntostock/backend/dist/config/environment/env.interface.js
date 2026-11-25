"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseDialect = exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment || (exports.Environment = Environment = {}));
var DatabaseDialect;
(function (DatabaseDialect) {
    DatabaseDialect["MySQL"] = "mysql";
    DatabaseDialect["Postgres"] = "postgres";
    DatabaseDialect["MSSQL"] = "mssql";
    DatabaseDialect["Oracle"] = "oracle";
})(DatabaseDialect || (exports.DatabaseDialect = DatabaseDialect = {}));
//# sourceMappingURL=env.interface.js.map