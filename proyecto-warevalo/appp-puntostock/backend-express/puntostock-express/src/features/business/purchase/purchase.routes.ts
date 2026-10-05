import { Application } from "express";
import { PurchaseController } from "./purchase.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Purchase — modalidad JWT + RBAC en todas las operaciones. */
export class PurchaseRoutes {
  public purchaseController: PurchaseController = new PurchaseController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/compras")
      .get(authenticate, authorize, this.purchaseController.getAll.bind(this.purchaseController));

    // getOne
    app
      .route("/api/compras/:id")
      .get(authenticate, authorize, this.purchaseController.getOne.bind(this.purchaseController));

    // create
    app
      .route("/api/compras")
      .post(
        authenticate,
        authorize,
        this.purchaseController.create.bind(this.purchaseController)
      );

    // receive (recepción parcial o total)
    app
      .route("/api/compras/:id/receive")
      .patch(
        authenticate,
        authorize,
        this.purchaseController.receive.bind(this.purchaseController)
      );

    // cancel
    app
      .route("/api/compras/:id/cancel")
      .patch(
        authenticate,
        authorize,
        this.purchaseController.cancel.bind(this.purchaseController)
      );

    // delete físico
    app
      .route("/api/compras/:id")
      .delete(
        authenticate,
        authorize,
        this.purchaseController.deletePhysical.bind(this.purchaseController)
      );
  }
}
