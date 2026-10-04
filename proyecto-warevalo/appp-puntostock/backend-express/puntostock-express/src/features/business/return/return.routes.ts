import { Application } from "express";
import { ReturnController } from "./return.controller";

export class ReturnRoutes {
  public returnController: ReturnController = new ReturnController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/devoluciones")
      .get(this.returnController.getAll.bind(this.returnController));

    // getOne
    app
      .route("/api/devoluciones/:id")
      .get(this.returnController.getOne.bind(this.returnController));

    // create
    app
      .route("/api/devoluciones")
      .post(this.returnController.create.bind(this.returnController));

    // approve
    app
      .route("/api/devoluciones/:id/approve")
      .patch(this.returnController.approve.bind(this.returnController));

    // reject
    app
      .route("/api/devoluciones/:id/reject")
      .patch(this.returnController.reject.bind(this.returnController));

    // delete físico
    app
      .route("/api/devoluciones/:id")
      .delete(this.returnController.deletePhysical.bind(this.returnController));
  }
}
