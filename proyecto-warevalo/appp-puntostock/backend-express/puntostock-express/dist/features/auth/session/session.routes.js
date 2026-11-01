"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
const session_controller_1 = require("./session.controller");
const access_1 = require("../access");
/**
 * Rutas del feature Session — las tres modalidades en un solo archivo.
 *
 *  Ruta                       | Modalidad                   | Middleware
 *  POST /api/sesion/login     | OPEN                         | —
 *  POST /api/sesion/refresh   | OPEN (credencial de sesión)  | —
 *  POST /api/sesion/logout    | OPEN (credencial de sesión)  | —
 *  GET  /api/sesion/perfil    | JWT                          | authenticate
 *  GET  /api/permisos         | JWT                          | authenticate
 *
 * Ninguna lleva authorize: la autorización granular no aplica a los puntos
 * de acceso previos o ajenos a la matriz de permisos. /api/permisos
 * devuelve los permisos efectivos del usuario autenticado (la misma
 * consulta que usa el middleware authorize), ideal para depurar el RBAC.
 */
class SessionRoutes {
    constructor() {
        this.sessionController = new session_controller_1.SessionController();
    }
    routes(app) {
        // login (OPEN)
        app
            .route("/api/sesion/login")
            .post(this.sessionController.login.bind(this.sessionController));
        // refresh (OPEN + refresh token)
        app
            .route("/api/sesion/refresh")
            .post(this.sessionController.refresh.bind(this.sessionController));
        // logout (OPEN + refresh token)
        app
            .route("/api/sesion/logout")
            .post(this.sessionController.logout.bind(this.sessionController));
        // perfil (JWT)
        app
            .route("/api/sesion/perfil")
            .get(access_1.authenticate, this.sessionController.profile.bind(this.sessionController));
        // permisos efectivos del usuario autenticado (JWT)
        app
            .route("/api/permisos")
            .get(access_1.authenticate, this.sessionController.myPermissions.bind(this.sessionController));
    }
}
exports.SessionRoutes = SessionRoutes;
//# sourceMappingURL=session.routes.js.map