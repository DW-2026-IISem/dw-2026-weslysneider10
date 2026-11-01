"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoutes = void 0;
const sale_controller_1 = require("./sale.controller");
const access_1 = require("../../auth/access");
class SaleRoutes {
    constructor() {
        this.saleController = new sale_controller_1.SaleController();
    }
    routes(app) {
        app
            .route("/api/ventas")
            .get(access_1.authenticate, access_1.authorize, this.saleController.getAll.bind(this.saleController));
        app
            .route("/api/ventas/:id")
            .get(access_1.authenticate, access_1.authorize, this.saleController.getOne.bind(this.saleController));
        app
            .route("/api/ventas")
            .post(access_1.authenticate, access_1.authorize, this.saleController.create.bind(this.saleController));
        app
            .route("/api/ventas/:id/cancel")
            .patch(access_1.authenticate, access_1.authorize, this.saleController.cancel.bind(this.saleController));
        app
            .route("/api/ventas/:id")
            .delete(access_1.authenticate, access_1.authorize, this.saleController.deletePhysical.bind(this.saleController));
    }
}
exports.SaleRoutes = SaleRoutes;
//# sourceMappingURL=sale.routes.js.map