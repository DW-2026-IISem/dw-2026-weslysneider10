"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const payment_controller_1 = require("./payment.controller");
const access_1 = require("../../auth/access");
class PaymentRoutes {
    constructor() {
        this.paymentController = new payment_controller_1.PaymentController();
    }
    routes(app) {
        app
            .route("/api/pagos")
            .get(access_1.authenticate, access_1.authorize, this.paymentController.getAll.bind(this.paymentController));
        app
            .route("/api/pagos/:id")
            .get(access_1.authenticate, access_1.authorize, this.paymentController.getOne.bind(this.paymentController));
        app
            .route("/api/pagos")
            .post(access_1.authenticate, access_1.authorize, this.paymentController.create.bind(this.paymentController));
        app
            .route("/api/pagos/:id")
            .put(access_1.authenticate, access_1.authorize, this.paymentController.updatePut.bind(this.paymentController))
            .patch(access_1.authenticate, access_1.authorize, this.paymentController.updatePatch.bind(this.paymentController));
        app
            .route("/api/pagos/:id")
            .delete(access_1.authenticate, access_1.authorize, this.paymentController.deletePhysical.bind(this.paymentController));
    }
}
exports.PaymentRoutes = PaymentRoutes;
//# sourceMappingURL=payment.routes.js.map