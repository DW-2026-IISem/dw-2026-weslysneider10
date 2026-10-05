import { Application } from "express";
import { RoleController } from "./role.controller";
import { authenticate, authorize } from "../access";

/** Rutas del feature Role — modalidad JWT + RBAC en todas las operaciones. */
export class RoleRoutes {
  public roleController: RoleController = new RoleController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/roles")
      .get(authenticate, authorize, this.roleController.getAll.bind(this.roleController));

    // getOne
    app
      .route("/api/roles/:id")
      .get(authenticate, authorize, this.roleController.getOne.bind(this.roleController));

    // create
    app
      .route("/api/roles")
      .post(authenticate, authorize, this.roleController.create.bind(this.roleController));

    // update (PUT / PATCH)
    app
      .route("/api/roles/:id")
      .put(authenticate, authorize, this.roleController.updatePut.bind(this.roleController))
      .patch(authenticate, authorize, this.roleController.updatePatch.bind(this.roleController));

    // delete físico
    app
      .route("/api/roles/:id")
      .delete(
        authenticate,
        authorize,
        this.roleController.deletePhysical.bind(this.roleController)
      );

    // delete lógico
    app
      .route("/api/roles/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.roleController.deleteLogical.bind(this.roleController)
      );
  }
}
