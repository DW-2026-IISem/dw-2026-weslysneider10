"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const product_controller_1 = require("./product.controller");
const access_1 = require("../../auth/access");
class ProductRoutes {
    constructor() {
        this.productController = new product_controller_1.ProductController();
    }
    routes(app) {
        app
            .route("/api/productos")
            .get(access_1.authenticate, access_1.authorize, this.productController.getAll.bind(this.productController));
        app
            .route("/api/productos/:id")
            .get(access_1.authenticate, access_1.authorize, this.productController.getOne.bind(this.productController));
        app
            .route("/api/productos")
            .post(access_1.authenticate, access_1.authorize, this.productController.create.bind(this.productController));
        app
            .route("/api/productos/:id")
            .put(access_1.authenticate, access_1.authorize, this.productController.updatePut.bind(this.productController))
            .patch(access_1.authenticate, access_1.authorize, this.productController.updatePatch.bind(this.productController));
        app
            .route("/api/productos/:id")
            .delete(access_1.authenticate, access_1.authorize, this.productController.deletePhysical.bind(this.productController));
        app
            .route("/api/productos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.productController.deleteLogical.bind(this.productController));
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=product.routes.js.map