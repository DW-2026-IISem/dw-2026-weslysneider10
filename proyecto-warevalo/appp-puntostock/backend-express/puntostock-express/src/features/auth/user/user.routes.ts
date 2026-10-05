import { Application } from "express";
import { UserController } from "./user.controller";
import { authenticate, authorize } from "../access";

/**
 * Rutas del feature User — modalidad JWT + RBAC en todas las operaciones.
 *
 * La administración de identidades está ella misma protegida por la matriz
 * de permisos: no basta con estar autenticado, hay que tener la concesión
 * concreta (GET /api/usuarios, POST /api/usuarios, ...).
 */
export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/usuarios")
      .get(authenticate, authorize, this.userController.getAll.bind(this.userController));

    // getOne
    app
      .route("/api/usuarios/:id")
      .get(authenticate, authorize, this.userController.getOne.bind(this.userController));

    // create
    app
      .route("/api/usuarios")
      .post(authenticate, authorize, this.userController.create.bind(this.userController));

    // update (PUT / PATCH)
    app
      .route("/api/usuarios/:id")
      .put(authenticate, authorize, this.userController.updatePut.bind(this.userController))
      .patch(authenticate, authorize, this.userController.updatePatch.bind(this.userController));

    // delete físico
    app
      .route("/api/usuarios/:id")
      .delete(
        authenticate,
        authorize,
        this.userController.deletePhysical.bind(this.userController)
      );

    // delete lógico
    app
      .route("/api/usuarios/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.userController.deleteLogical.bind(this.userController)
      );

    // cambio de contraseña
    app
      .route("/api/usuarios/:id/password")
      .patch(
        authenticate,
        authorize,
        this.userController.changePassword.bind(this.userController)
      );

    // permisos efectivos del usuario
    app
      .route("/api/usuarios/:id/permisos")
      .get(
        authenticate,
        authorize,
        this.userController.getEffectivePermissions.bind(this.userController)
      );
  }
}
