import { Application } from "express";
import { SaleController } from "./sale.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Sale — modalidad JWT + RBAC en todas las operaciones. */
export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/ventas")
      .get(authenticate, authorize, this.saleController.getAll.bind(this.saleController));

    // getOne
    app
      .route("/api/ventas/:id")
      .get(authenticate, authorize, this.saleController.getOne.bind(this.saleController));

    // create
    app
      .route("/api/ventas")
      .post(authenticate, authorize, this.saleController.create.bind(this.saleController));

    // cancel
    app
      .route("/api/ventas/:id/cancel")
      .patch(authenticate, authorize, this.saleController.cancel.bind(this.saleController));

    // delete físico
    app
      .route("/api/ventas/:id")
      .delete(
        authenticate,
        authorize,
        this.saleController.deletePhysical.bind(this.saleController)
      );
  }
}
