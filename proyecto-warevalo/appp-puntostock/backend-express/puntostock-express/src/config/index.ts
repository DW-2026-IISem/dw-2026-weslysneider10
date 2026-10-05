import dotenv from "dotenv";
import express, { Application } from "express";
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
import "../features/business/purchase/purchase-detail.model";
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
    this.dbConnection();
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

    this.routePrv.userRoutes.routes(this.app);
    this.routePrv.roleRoutes.routes(this.app);
    this.routePrv.resourceRoutes.routes(this.app);
    this.routePrv.roleUserRoutes.routes(this.app);
    this.routePrv.resourceRoleRoutes.routes(this.app);
  }

  private docs(): void {
    setupSwagger(this.app);
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

      await sequelize.sync({
        force: false
      });

      console.log(`📦 Base de datos sincronizada exitosamente`);
    } catch (error) {
      console.error(
        "❌ Error al conectar con la base de datos:",
        error
      );

      process.exit(1);
    }
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get("port"));

    console.log(
      `🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`
    );
  }
}
