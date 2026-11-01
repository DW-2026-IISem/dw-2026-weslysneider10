"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("./user.controller");
const access_1 = require("../access");
/**
 * Rutas del feature User — modalidad JWT + RBAC en todas las operaciones.
 *
 * La administración de identidades está ella misma protegida por la matriz
 * de permisos: no basta con estar autenticado, hay que tener la concesión
 * concreta (GET /api/usuarios, POST /api/usuarios, ...).
 */
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/usuarios")
            .get(access_1.authenticate, access_1.authorize, this.userController.getAll.bind(this.userController));
        // getOne
        app
            .route("/api/usuarios/:id")
            .get(access_1.authenticate, access_1.authorize, this.userController.getOne.bind(this.userController));
        // create
        app
            .route("/api/usuarios")
            .post(access_1.authenticate, access_1.authorize, this.userController.create.bind(this.userController));
        // update (PUT / PATCH)
        app
            .route("/api/usuarios/:id")
            .put(access_1.authenticate, access_1.authorize, this.userController.updatePut.bind(this.userController))
            .patch(access_1.authenticate, access_1.authorize, this.userController.updatePatch.bind(this.userController));
        // delete físico
        app
            .route("/api/usuarios/:id")
            .delete(access_1.authenticate, access_1.authorize, this.userController.deletePhysical.bind(this.userController));
        // delete lógico
        app
            .route("/api/usuarios/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.userController.deleteLogical.bind(this.userController));
        // cambio de contraseña
        app
            .route("/api/usuarios/:id/password")
            .patch(access_1.authenticate, access_1.authorize, this.userController.changePassword.bind(this.userController));
        // permisos efectivos del usuario
        app
            .route("/api/usuarios/:id/permisos")
            .get(access_1.authenticate, access_1.authorize, this.userController.getEffectivePermissions.bind(this.userController));
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map