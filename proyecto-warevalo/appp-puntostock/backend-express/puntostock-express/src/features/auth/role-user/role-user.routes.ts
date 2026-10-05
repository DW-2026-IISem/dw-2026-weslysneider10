import { Application } from "express";
import { RoleUserController } from "./role-user.controller";
import { authenticate, authorize } from "../access";

/** Rutas del feature RoleUser — modalidad JWT + RBAC. */
export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/asignaciones-rol")
      .get(authenticate, authorize, this.roleUserController.getAll.bind(this.roleUserController));

    // getOne
    app
      .route("/api/asignaciones-rol/:id")
      .get(authenticate, authorize, this.roleUserController.getOne.bind(this.roleUserController));

    // asignar rol (create)
    app
      .route("/api/asignaciones-rol")
      .post(authenticate, authorize, this.roleUserController.assign.bind(this.roleUserController));

    // retirar rol (delete lógico)
    app
      .route("/api/asignaciones-rol/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.roleUserController.deactivate.bind(this.roleUserController)
      );

    // reactivar asignación
    app
      .route("/api/asignaciones-rol/:id/reactivate")
      .patch(
        authenticate,
        authorize,
        this.roleUserController.reactivate.bind(this.roleUserController)
      );
  }
}
