import { Application } from "express";
import { PurchaseController } from "./purchase.controller";

export class PurchaseRoutes {
  public purchaseController: PurchaseController = new PurchaseController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/compras")
      .get(this.purchaseController.getAll.bind(this.purchaseController));

    // getOne
    app
      .route("/api/compras/:id")
      .get(this.purchaseController.getOne.bind(this.purchaseController));

    // create
    app
      .route("/api/compras")
      .post(this.purchaseController.create.bind(this.purchaseController));

    // (rellenar en los siguientes pasos)
  }
}
