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

    // receive (recepción parcial o total)
    app
      .route("/api/compras/:id/receive")
      .patch(this.purchaseController.receive.bind(this.purchaseController));

    // cancel
    app
      .route("/api/compras/:id/cancel")
      .patch(this.purchaseController.cancel.bind(this.purchaseController));

    // delete físico
    app
      .route("/api/compras/:id")
      .delete(this.purchaseController.deletePhysical.bind(this.purchaseController));
  }
}
