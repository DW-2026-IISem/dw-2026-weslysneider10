import { Application } from "express";
import { ResourceController } from "./resource.controller";
import { authenticate, authorize } from "../access";

/** Rutas del feature Resource — modalidad JWT + RBAC en todas las operaciones. */
export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/recursos")
      .get(authenticate, authorize, this.resourceController.getAll.bind(this.resourceController));

    // getOne
    app
      .route("/api/recursos/:id")
      .get(authenticate, authorize, this.resourceController.getOne.bind(this.resourceController));

    // create
    app
      .route("/api/recursos")
      .post(authenticate, authorize, this.resourceController.create.bind(this.resourceController));

    // update (PUT / PATCH)
    app
      .route("/api/recursos/:id")
      .put(
        authenticate,
        authorize,
        this.resourceController.updatePut.bind(this.resourceController)
      )
      .patch(
        authenticate,
        authorize,
        this.resourceController.updatePatch.bind(this.resourceController)
      );

    // delete físico
    app
      .route("/api/recursos/:id")
      .delete(
        authenticate,
        authorize,
        this.resourceController.deletePhysical.bind(this.resourceController)
      );

    // delete lógico
    app
      .route("/api/recursos/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.resourceController.deleteLogical.bind(this.resourceController)
      );
  }
}
