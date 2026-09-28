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

    // (rellenar en los siguientes pasos: update, delete)
  }
}
