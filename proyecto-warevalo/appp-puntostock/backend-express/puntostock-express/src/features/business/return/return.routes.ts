import { Application } from "express";
import { ReturnController } from "./return.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Return — modalidad JWT + RBAC en todas las operaciones. */
export class ReturnRoutes {
  public returnController: ReturnController = new ReturnController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/devoluciones")
      .get(authenticate, authorize, this.returnController.getAll.bind(this.returnController));

    // getOne
    app
      .route("/api/devoluciones/:id")
      .get(authenticate, authorize, this.returnController.getOne.bind(this.returnController));

    // create
    app
      .route("/api/devoluciones")
      .post(authenticate, authorize, this.returnController.create.bind(this.returnController));

    // approve
    app
      .route("/api/devoluciones/:id/approve")
      .patch(
        authenticate,
        authorize,
        this.returnController.approve.bind(this.returnController)
      );

    // reject
    app
      .route("/api/devoluciones/:id/reject")
      .patch(
        authenticate,
        authorize,
        this.returnController.reject.bind(this.returnController)
      );

    // delete físico
    app
      .route("/api/devoluciones/:id")
      .delete(
        authenticate,
        authorize,
        this.returnController.deletePhysical.bind(this.returnController)
      );
  }
}
