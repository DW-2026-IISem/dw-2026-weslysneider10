import { Application } from "express";
import { BranchController } from "./branch.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Branch — modalidad JWT + RBAC en todas las operaciones. */
export class BranchRoutes {
  public branchController: BranchController = new BranchController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/sucursales")
      .get(authenticate, authorize, this.branchController.getAll.bind(this.branchController));

    // getOne
    app
      .route("/api/sucursales/:id")
      .get(authenticate, authorize, this.branchController.getOne.bind(this.branchController));

    // create
    app
      .route("/api/sucursales")
      .post(authenticate, authorize, this.branchController.create.bind(this.branchController));

    // update (PUT / PATCH)
    app
      .route("/api/sucursales/:id")
      .put(authenticate, authorize, this.branchController.updatePut.bind(this.branchController))
      .patch(
        authenticate,
        authorize,
        this.branchController.updatePatch.bind(this.branchController)
      );

    // delete físico
    app
      .route("/api/sucursales/:id")
      .delete(
        authenticate,
        authorize,
        this.branchController.deletePhysical.bind(this.branchController)
      );

    // delete lógico
    app
      .route("/api/sucursales/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.branchController.deleteLogical.bind(this.branchController)
      );
  }
}
