import { Application } from "express";
import { ResourceRoleController } from "./resource-role.controller";
import { authenticate, authorize } from "../access";

/** Rutas del feature ResourceRole — modalidad JWT + RBAC. */
export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    // getAll (filtros ?role_id= y ?resource_id=)
    app
      .route("/api/concesiones-rol")
      .get(
        authenticate,
        authorize,
        this.resourceRoleController.getAll.bind(this.resourceRoleController)
      );

    // getOne
    app
      .route("/api/concesiones-rol/:id")
      .get(
        authenticate,
        authorize,
        this.resourceRoleController.getOne.bind(this.resourceRoleController)
      );

    // conceder recurso a rol (create)
    app
      .route("/api/concesiones-rol")
      .post(
        authenticate,
        authorize,
        this.resourceRoleController.grant.bind(this.resourceRoleController)
      );

    // retirar permiso (delete lógico)
    app
      .route("/api/concesiones-rol/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.resourceRoleController.deactivate.bind(this.resourceRoleController)
      );

    // reactivar permiso
    app
      .route("/api/concesiones-rol/:id/reactivate")
      .patch(
        authenticate,
        authorize,
        this.resourceRoleController.reactivate.bind(this.resourceRoleController)
      );
  }
}
