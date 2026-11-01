"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoleRoutes = void 0;
const resource_role_controller_1 = require("./resource-role.controller");
const access_1 = require("../access");
/** Rutas del feature ResourceRole — modalidad JWT + RBAC. */
class ResourceRoleRoutes {
    constructor() {
        this.resourceRoleController = new resource_role_controller_1.ResourceRoleController();
    }
    routes(app) {
        // getAll (filtros ?role_id= y ?resource_id=)
        app
            .route("/api/concesiones-rol")
            .get(access_1.authenticate, access_1.authorize, this.resourceRoleController.getAll.bind(this.resourceRoleController));
        // getOne
        app
            .route("/api/concesiones-rol/:id")
            .get(access_1.authenticate, access_1.authorize, this.resourceRoleController.getOne.bind(this.resourceRoleController));
        // conceder recurso a rol (create)
        app
            .route("/api/concesiones-rol")
            .post(access_1.authenticate, access_1.authorize, this.resourceRoleController.grant.bind(this.resourceRoleController));
        // retirar permiso (delete lógico)
        app
            .route("/api/concesiones-rol/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourceRoleController.deactivate.bind(this.resourceRoleController));
        // reactivar permiso
        app
            .route("/api/concesiones-rol/:id/reactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourceRoleController.reactivate.bind(this.resourceRoleController));
    }
}
exports.ResourceRoleRoutes = ResourceRoleRoutes;
//# sourceMappingURL=resource-role.routes.js.map