import { Application } from "express";
import { RefreshTokenController } from "./refresh-token.controller";
import { authenticate } from "../access";

/**
 * Rutas del feature RefreshToken — modalidad JWT, sin RBAC.
 *
 * Todas operan sobre las sesiones del usuario autenticado. Ver y revocar
 * las propias sesiones es un derecho derivado de estar autenticado, no de
 * un permiso concreto; por eso no llevan authorize ni figuran en el
 * catálogo de recursos.
 *
 * Nota de enrutado: /api/sesiones/deactivate-all es una ruta literal del
 * mismo verbo (PATCH) que /api/sesiones/:id/deactivate. No colisionan,
 * pero la literal se registra primero por claridad.
 */
export class RefreshTokenRoutes {
  public refreshTokenController: RefreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    // getAll (sesiones propias)
    app
      .route("/api/sesiones")
      .get(authenticate, this.refreshTokenController.getAll.bind(this.refreshTokenController));

    // revocar todas las sesiones propias (ruta literal: va ANTES de /:id)
    app
      .route("/api/sesiones/deactivate-all")
      .patch(
        authenticate,
        this.refreshTokenController.revokeAll.bind(this.refreshTokenController)
      );

    // getOne
    app
      .route("/api/sesiones/:id")
      .get(authenticate, this.refreshTokenController.getOne.bind(this.refreshTokenController));

    // revocar una sesión propia
    app
      .route("/api/sesiones/:id/deactivate")
      .patch(
        authenticate,
        this.refreshTokenController.revokeOne.bind(this.refreshTokenController)
      );

    // purga de sesiones propias revocadas/expiradas
    app
      .route("/api/sesiones")
      .delete(authenticate, this.refreshTokenController.purge.bind(this.refreshTokenController));
  }
}
