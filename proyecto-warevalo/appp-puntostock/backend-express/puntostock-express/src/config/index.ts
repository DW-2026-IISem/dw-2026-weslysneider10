import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
var cors = require("cors");

import {
  sequelize,
  getDatabaseInfo,
  testConnection
} from "../database/db";

import "../features/business/client/client.model";
import "../features/business/product-type/product-type.model";
import "../features/business/product/product.model";
import "../features/business/product/product.associations";
import "../features/business/branch/branch.model";
import "../features/business/supplier/supplier.model";
import "../features/business/inventory/inventory.model";
import "../features/business/payment/payment.model";
import "../features/business/purchase/purchase.model";
import "../features/business/purchase/purchase.associations";
import "../features/business/sale/sale.model";
import "../features/business/sale/sale-detail.model";
import "../features/business/sale/sale.associations";
import "../features/business/return/return.model";

// Fase II — Auth con RBAC: primero los seis modelos, después las asociaciones
// (las asociaciones referencian los modelos, no al revés).
import "../features/auth/user/user.model";
import "../features/auth/role/role.model";
import "../features/auth/resource/resource.model";
import "../features/auth/role-user/role-user.model";
import "../features/auth/resource-role/resource-role.model";
import "../features/auth/refresh-token/refresh-token.model";
import "../features/auth/rbac.associations";

import { Routes } from "../routes/index";
import { setupSwagger } from "../swagger/index";

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.docs();
    this.errorHandling();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    // Fase I — Business (cada operación, modalidad JWT + RBAC)
    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.productTypeRoutes.routes(this.app);
    this.routePrv.productRoutes.routes(this.app);
    this.routePrv.branchRoutes.routes(this.app);
    this.routePrv.supplierRoutes.routes(this.app);
    this.routePrv.inventoryRoutes.routes(this.app);
    this.routePrv.paymentRoutes.routes(this.app);
    this.routePrv.purchaseRoutes.routes(this.app);
    this.routePrv.saleRoutes.routes(this.app);
    this.routePrv.returnRoutes.routes(this.app);

    // Fase II — Auth con RBAC
    // sessionRoutes registra los endpoints OPEN/JWT (login, refresh, logout,
    // perfil, permisos); el resto son modalidad JWT + RBAC.
    this.routePrv.sessionRoutes.routes(this.app);
    this.routePrv.refreshTokenRoutes.routes(this.app);
    this.routePrv.userRoutes.routes(this.app);
    this.routePrv.roleRoutes.routes(this.app);
    this.routePrv.resourceRoutes.routes(this.app);
    this.routePrv.roleUserRoutes.routes(this.app);
    this.routePrv.resourceRoleRoutes.routes(this.app);
  }

  private docs(): void {
    setupSwagger(this.app);
  }

  /**
   * Errores que ocurren antes de llegar a un controller o middleware.
   *
   * El caso típico es un cuerpo JSON malformado: express.json() lanza un
   * SyntaxError que, sin manejador, cae en el de Express por defecto y
   * responde 400 con un HTML que incluye el stack trace y rutas absolutas
   * del servidor (fuga de información). Aquí se traduce a un 400 JSON limpio.
   *
   * Debe registrarse después de las rutas: Express reconoce un middleware
   * de error por su aridad de 4 argumentos.
   */
  private errorHandling(): void {
    const bodyErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
      if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({ error: "Malformed JSON body" });
        return;
      }
      next(err);
    };
    this.app.use(bodyErrorHandler);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();

      console.log(
        `🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`
      );

      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(
          `No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`
        );
      }

      // Lab: sync crea/altera tablas desde los modelos.
      // DB_SYNC_FORCE=true recrea las tablas desde cero (borra datos) —
      // útil si cambiaste de camelCase a snake_case o viceversa a mitad de proyecto.
      const force = process.env.DB_SYNC_FORCE === "true";
      const isMysql =
        sequelize.getDialect() === "mysql" || sequelize.getDialect() === "mariadb";

      if (isMysql) {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
      }
      try {
        await sequelize.sync({ force, alter: !force });
      } finally {
        if (isMysql) {
          await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
        }
      }

      console.log(
        force
          ? "📦 Base de datos recreada (DB_SYNC_FORCE=true)"
          : "📦 Base de datos sincronizada exitosamente"
      );
    } catch (error) {
      console.error(
        "❌ Error al conectar con la base de datos:",
        error
      );

      process.exit(1);
    }
  }

  async listen(): Promise<void> {
    // Orden de arranque: primero la BD (conexión + sync), después abrir el
    // puerto. Si se abre el puerto antes de terminar sync({ alter: true }),
    // las sentencias DDL compiten con las peticiones que ya están entrando
    // y provocan deadlocks y errores de FK intermitentes.
    await this.dbConnection();
    await this.app.listen(this.app.get("port"));

    console.log(
      `🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`
    );
  }
}
