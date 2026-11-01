"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserRoutes = void 0;
const role_user_controller_1 = require("./role-user.controller");
const access_1 = require("../access");
/** Rutas del feature RoleUser — modalidad JWT + RBAC. */
class RoleUserRoutes {
    constructor() {
        this.roleUserController = new role_user_controller_1.RoleUserController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/asignaciones-rol")
            .get(access_1.authenticate, access_1.authorize, this.roleUserController.getAll.bind(this.roleUserController));
        // getOne
        app
            .route("/api/asignaciones-rol/:id")
            .get(access_1.authenticate, access_1.authorize, this.roleUserController.getOne.bind(this.roleUserController));
        // asignar rol (create)
        app
            .route("/api/asignaciones-rol")
            .post(access_1.authenticate, access_1.authorize, this.roleUserController.assign.bind(this.roleUserController));
        // retirar rol (delete lógico)
        app
            .route("/api/asignaciones-rol/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.roleUserController.deactivate.bind(this.roleUserController));
        // reactivar asignación
        app
            .route("/api/asignaciones-rol/:id/reactivate")
            .patch(access_1.authenticate, access_1.authorize, this.roleUserController.reactivate.bind(this.roleUserController));
    }
}
exports.RoleUserRoutes = RoleUserRoutes;
//# sourceMappingURL=role-user.routes.js.map