"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = void 0;
const return_controller_1 = require("./return.controller");
const access_1 = require("../../auth/access");
class ReturnRoutes {
    constructor() {
        this.returnController = new return_controller_1.ReturnController();
    }
    routes(app) {
        app
            .route("/api/devoluciones")
            .get(access_1.authenticate, access_1.authorize, this.returnController.getAll.bind(this.returnController));
        app
            .route("/api/devoluciones/:id")
            .get(access_1.authenticate, access_1.authorize, this.returnController.getOne.bind(this.returnController));
        app
            .route("/api/devoluciones")
            .post(access_1.authenticate, access_1.authorize, this.returnController.create.bind(this.returnController));
        app
            .route("/api/devoluciones/:id/approve")
            .patch(access_1.authenticate, access_1.authorize, this.returnController.approve.bind(this.returnController));
        app
            .route("/api/devoluciones/:id/reject")
            .patch(access_1.authenticate, access_1.authorize, this.returnController.reject.bind(this.returnController));
        app
            .route("/api/devoluciones/:id")
            .delete(access_1.authenticate, access_1.authorize, this.returnController.deletePhysical.bind(this.returnController));
    }
}
exports.ReturnRoutes = ReturnRoutes;
//# sourceMappingURL=return.routes.js.map