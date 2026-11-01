"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const purchase_controller_1 = require("./purchase.controller");
const access_1 = require("../../auth/access");
class PurchaseRoutes {
    constructor() {
        this.purchaseController = new purchase_controller_1.PurchaseController();
    }
    routes(app) {
        app
            .route("/api/compras")
            .get(access_1.authenticate, access_1.authorize, this.purchaseController.getAll.bind(this.purchaseController));
        app
            .route("/api/compras/:id")
            .get(access_1.authenticate, access_1.authorize, this.purchaseController.getOne.bind(this.purchaseController));
        app
            .route("/api/compras")
            .post(access_1.authenticate, access_1.authorize, this.purchaseController.create.bind(this.purchaseController));
        app
            .route("/api/compras/:id/receive")
            .patch(access_1.authenticate, access_1.authorize, this.purchaseController.receive.bind(this.purchaseController));
        app
            .route("/api/compras/:id/cancel")
            .patch(access_1.authenticate, access_1.authorize, this.purchaseController.cancel.bind(this.purchaseController));
        app
            .route("/api/compras/:id")
            .delete(access_1.authenticate, access_1.authorize, this.purchaseController.deletePhysical.bind(this.purchaseController));
    }
}
exports.PurchaseRoutes = PurchaseRoutes;
//# sourceMappingURL=purchase.routes.js.map