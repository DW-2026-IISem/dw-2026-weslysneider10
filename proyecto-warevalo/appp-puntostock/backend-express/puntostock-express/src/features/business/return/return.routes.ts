import { Application } from "express";
import { ReturnController } from "./return.controller";
import { authenticate, authorize } from "../../auth/access";

export class ReturnRoutes {
  public returnController: ReturnController = new ReturnController();

  public routes(app: Application): void {
    app
      .route("/api/devoluciones")
      .get(authenticate, authorize, this.returnController.getAll.bind(this.returnController));

    app
      .route("/api/devoluciones/:id")
      .get(authenticate, authorize, this.returnController.getOne.bind(this.returnController));

    app
      .route("/api/devoluciones")
      .post(authenticate, authorize, this.returnController.create.bind(this.returnController));

    app
      .route("/api/devoluciones/:id/approve")
      .patch(
        authenticate,
        authorize,
        this.returnController.approve.bind(this.returnController)
      );

    app
      .route("/api/devoluciones/:id/reject")
      .patch(
        authenticate,
        authorize,
        this.returnController.reject.bind(this.returnController)
      );

    app
      .route("/api/devoluciones/:id")
      .delete(
        authenticate,
        authorize,
        this.returnController.deletePhysical.bind(this.returnController)
      );
  }
}
