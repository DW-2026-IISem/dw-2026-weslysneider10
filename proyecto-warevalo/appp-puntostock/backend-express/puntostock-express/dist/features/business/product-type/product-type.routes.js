"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeRoutes = void 0;
const product_type_controller_1 = require("./product-type.controller");
const access_1 = require("../../auth/access");
class ProductTypeRoutes {
    constructor() {
        this.productTypeController = new product_type_controller_1.ProductTypeController();
    }
    routes(app) {
        app
            .route("/api/tipos-producto")
            .get(access_1.authenticate, access_1.authorize, this.productTypeController.getAll.bind(this.productTypeController));
        app
            .route("/api/tipos-producto/:id")
            .get(access_1.authenticate, access_1.authorize, this.productTypeController.getOne.bind(this.productTypeController));
        app
            .route("/api/tipos-producto")
            .post(access_1.authenticate, access_1.authorize, this.productTypeController.create.bind(this.productTypeController));
        app
            .route("/api/tipos-producto/:id")
            .put(access_1.authenticate, access_1.authorize, this.productTypeController.updatePut.bind(this.productTypeController))
            .patch(access_1.authenticate, access_1.authorize, this.productTypeController.updatePatch.bind(this.productTypeController));
        app
            .route("/api/tipos-producto/:id")
            .delete(access_1.authenticate, access_1.authorize, this.productTypeController.deletePhysical.bind(this.productTypeController));
        app
            .route("/api/tipos-producto/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.productTypeController.deleteLogical.bind(this.productTypeController));
    }
}
exports.ProductTypeRoutes = ProductTypeRoutes;
//# sourceMappingURL=product-type.routes.js.map