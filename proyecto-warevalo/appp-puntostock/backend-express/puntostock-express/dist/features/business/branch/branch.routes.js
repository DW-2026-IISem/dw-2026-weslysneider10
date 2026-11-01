"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRoutes = void 0;
const branch_controller_1 = require("./branch.controller");
const access_1 = require("../../auth/access");
class BranchRoutes {
    constructor() {
        this.branchController = new branch_controller_1.BranchController();
    }
    routes(app) {
        app
            .route("/api/sucursales")
            .get(access_1.authenticate, access_1.authorize, this.branchController.getAll.bind(this.branchController));
        app
            .route("/api/sucursales/:id")
            .get(access_1.authenticate, access_1.authorize, this.branchController.getOne.bind(this.branchController));
        app
            .route("/api/sucursales")
            .post(access_1.authenticate, access_1.authorize, this.branchController.create.bind(this.branchController));
        app
            .route("/api/sucursales/:id")
            .put(access_1.authenticate, access_1.authorize, this.branchController.updatePut.bind(this.branchController))
            .patch(access_1.authenticate, access_1.authorize, this.branchController.updatePatch.bind(this.branchController));
        app
            .route("/api/sucursales/:id")
            .delete(access_1.authenticate, access_1.authorize, this.branchController.deletePhysical.bind(this.branchController));
        app
            .route("/api/sucursales/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.branchController.deleteLogical.bind(this.branchController));
    }
}
exports.BranchRoutes = BranchRoutes;
//# sourceMappingURL=branch.routes.js.map