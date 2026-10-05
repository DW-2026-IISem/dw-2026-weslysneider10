import { Application } from "express";
import { ClientController } from "./client.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Client — modalidad JWT + RBAC en todas las operaciones. */
export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/clientes")
      .get(authenticate, authorize, this.clientController.getAll.bind(this.clientController));

    // getOne
    app
      .route("/api/clientes/:id")
      .get(authenticate, authorize, this.clientController.getOne.bind(this.clientController));

    // create
    app
      .route("/api/clientes")
      .post(authenticate, authorize, this.clientController.create.bind(this.clientController));

    // update (PUT / PATCH)
    app
      .route("/api/clientes/:id")
      .put(authenticate, authorize, this.clientController.updatePut.bind(this.clientController))
      .patch(
        authenticate,
        authorize,
        this.clientController.updatePatch.bind(this.clientController)
      );

    // delete físico
    app
      .route("/api/clientes/:id")
      .delete(
        authenticate,
        authorize,
        this.clientController.deletePhysical.bind(this.clientController)
      );

    // delete lógico
    app
      .route("/api/clientes/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.clientController.deleteLogical.bind(this.clientController)
      );
  }
}
