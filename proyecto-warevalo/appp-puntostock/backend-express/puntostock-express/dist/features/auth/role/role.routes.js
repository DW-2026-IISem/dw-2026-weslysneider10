"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const role_controller_1 = require("./role.controller");
const access_1 = require("../access");
/** Rutas del feature Role — modalidad JWT + RBAC en todas las operaciones. */
class RoleRoutes {
    constructor() {
        this.roleController = new role_controller_1.RoleController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/roles")
            .get(access_1.authenticate, access_1.authorize, this.roleController.getAll.bind(this.roleController));
        // getOne
        app
            .route("/api/roles/:id")
            .get(access_1.authenticate, access_1.authorize, this.roleController.getOne.bind(this.roleController));
        // create
        app
            .route("/api/roles")
            .post(access_1.authenticate, access_1.authorize, this.roleController.create.bind(this.roleController));
        // update (PUT / PATCH)
        app
            .route("/api/roles/:id")
            .put(access_1.authenticate, access_1.authorize, this.roleController.updatePut.bind(this.roleController))
            .patch(access_1.authenticate, access_1.authorize, this.roleController.updatePatch.bind(this.roleController));
        // delete físico
        app
            .route("/api/roles/:id")
            .delete(access_1.authenticate, access_1.authorize, this.roleController.deletePhysical.bind(this.roleController));
        // delete lógico
        app
            .route("/api/roles/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.roleController.deleteLogical.bind(this.roleController));
    }
}
exports.RoleRoutes = RoleRoutes;
//# sourceMappingURL=role.routes.js.map