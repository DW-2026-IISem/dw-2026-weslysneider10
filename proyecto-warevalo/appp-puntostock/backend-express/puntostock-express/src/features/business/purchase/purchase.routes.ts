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

    // details
    app
      .route("/api/compras/:id/detalles")
      .get(this.purchaseController.getDetails.bind(this.purchaseController));

    // receive
    app
      .route("/api/compras/:id/receive")
      .patch(this.purchaseController.receive.bind(this.purchaseController));

    // getOne
    app
      .route("/api/compras/:id")
      .get(this.purchaseController.getOne.bind(this.purchaseController));

    // create
    app
      .route("/api/compras")
      .post(this.purchaseController.create.bind(this.purchaseController));

    // update
    app
      .route("/api/compras/:id")
      .put(this.purchaseController.updatePut.bind(this.purchaseController))
      .patch(this.purchaseController.updatePatch.bind(this.purchaseController));

    // delete físico
    app
      .route("/api/compras/:id")
      .delete(this.purchaseController.deletePhysical.bind(this.purchaseController));

    // delete lógico
    app
      .route("/api/compras/:id/deactivate")
      .patch(this.purchaseController.deleteLogical.bind(this.purchaseController));
  }
}
