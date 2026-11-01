"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoutes = void 0;
const resource_controller_1 = require("./resource.controller");
const access_1 = require("../access");
/** Rutas del feature Resource — modalidad JWT + RBAC en todas las operaciones. */
class ResourceRoutes {
    constructor() {
        this.resourceController = new resource_controller_1.ResourceController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/recursos")
            .get(access_1.authenticate, access_1.authorize, this.resourceController.getAll.bind(this.resourceController));
        // getOne
        app
            .route("/api/recursos/:id")
            .get(access_1.authenticate, access_1.authorize, this.resourceController.getOne.bind(this.resourceController));
        // create
        app
            .route("/api/recursos")
            .post(access_1.authenticate, access_1.authorize, this.resourceController.create.bind(this.resourceController));
        // update (PUT / PATCH)
        app
            .route("/api/recursos/:id")
            .put(access_1.authenticate, access_1.authorize, this.resourceController.updatePut.bind(this.resourceController))
            .patch(access_1.authenticate, access_1.authorize, this.resourceController.updatePatch.bind(this.resourceController));
        // delete físico
        app
            .route("/api/recursos/:id")
            .delete(access_1.authenticate, access_1.authorize, this.resourceController.deletePhysical.bind(this.resourceController));
        // delete lógico
        app
            .route("/api/recursos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourceController.deleteLogical.bind(this.resourceController));
    }
}
exports.ResourceRoutes = ResourceRoutes;
//# sourceMappingURL=resource.routes.js.map