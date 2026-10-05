import { Application } from "express";
import { PurchaseController } from "./purchase.controller";
import { authenticate, authorize } from "../../auth/access";

export class PurchaseRoutes {
  public purchaseController: PurchaseController = new PurchaseController();

  public routes(app: Application): void {
    app
      .route("/api/compras")
      .get(authenticate, authorize, this.purchaseController.getAll.bind(this.purchaseController));

    app
      .route("/api/compras/:id")
      .get(authenticate, authorize, this.purchaseController.getOne.bind(this.purchaseController));

    app
      .route("/api/compras")
      .post(authenticate, authorize, this.purchaseController.create.bind(this.purchaseController));

    app
      .route("/api/compras/:id/receive")
      .patch(
        authenticate,
        authorize,
        this.purchaseController.receive.bind(this.purchaseController)
      );

    app
      .route("/api/compras/:id/cancel")
      .patch(
        authenticate,
        authorize,
        this.purchaseController.cancel.bind(this.purchaseController)
      );

    app
      .route("/api/compras/:id")
      .delete(
        authenticate,
        authorize,
        this.purchaseController.deletePhysical.bind(this.purchaseController)
      );
  }
}
