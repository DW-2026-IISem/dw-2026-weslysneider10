"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
var cors = require("cors");
const db_1 = require("../database/db");
require("../features/business/client/client.model");
const index_1 = require("../routes/index");
dotenv_1.default.config();
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.routePrv.clientRoutes.routes(this.app);
    }
    async dbConnection() {
        try {
            const dbInfo = (0, db_1.getDatabaseInfo)();
            console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);
            const isConnected = await (0, db_1.testConnection)();
            if (!isConnected) {
                throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
            }
            // alter: true actualiza columnas faltantes (ej. createdAt/updatedAt tras timestamps: true).
            // force: false no recrea tablas; no borra datos. En producción preferir migraciones.
            await db_1.sequelize.sync({ force: false, alter: true });
            console.log(`📦 Base de datos sincronizada exitosamente`);
        }
        catch (error) {
            console.error("❌ Error al conectar con la base de datos:", error);
            process.exit(1);
        }
    }
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map