import { Application } from "express";
import { BranchController } from "./branch.controller";

export class BranchRoutes {
  public branchController: BranchController = new BranchController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/sucursales")
      .get(this.branchController.getAll.bind(this.branchController));

    // getOne
    app
      .route("/api/sucursales/:id")
      .get(this.branchController.getOne.bind(this.branchController));

    // create
    app
      .route("/api/sucursales")
      .post(this.branchController.create.bind(this.branchController));

    // update (PUT / PATCH)
    app
      .route("/api/sucursales/:id")
      .put(this.branchController.updatePut.bind(this.branchController))
      .patch(this.branchController.updatePatch.bind(this.branchController));

    // delete físico
    app
      .route("/api/sucursales/:id")
      .delete(this.branchController.deletePhysical.bind(this.branchController));

    // delete lógico
    app
      .route("/api/sucursales/:id/deactivate")
      .patch(this.branchController.deleteLogical.bind(this.branchController));
  }
}
