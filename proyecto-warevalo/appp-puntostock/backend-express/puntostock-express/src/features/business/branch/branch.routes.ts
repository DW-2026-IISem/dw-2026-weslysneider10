import { Application } from "express";
import { BranchController } from "./branch.controller";
import { authenticate, authorize } from "../../auth/access";

export class BranchRoutes {
  public branchController: BranchController = new BranchController();

  public routes(app: Application): void {
    app
      .route("/api/sucursales")
      .get(authenticate, authorize, this.branchController.getAll.bind(this.branchController));

    app
      .route("/api/sucursales/:id")
      .get(authenticate, authorize, this.branchController.getOne.bind(this.branchController));

    app
      .route("/api/sucursales")
      .post(authenticate, authorize, this.branchController.create.bind(this.branchController));

    app
      .route("/api/sucursales/:id")
      .put(authenticate, authorize, this.branchController.updatePut.bind(this.branchController))
      .patch(authenticate, authorize, this.branchController.updatePatch.bind(this.branchController));

    app
      .route("/api/sucursales/:id")
      .delete(
        authenticate,
        authorize,
        this.branchController.deletePhysical.bind(this.branchController)
      );

    app
      .route("/api/sucursales/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.branchController.deleteLogical.bind(this.branchController)
      );
  }
}
