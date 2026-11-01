"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const supplier_controller_1 = require("./supplier.controller");
const access_1 = require("../../auth/access");
class SupplierRoutes {
    constructor() {
        this.supplierController = new supplier_controller_1.SupplierController();
    }
    routes(app) {
        app
            .route("/api/proveedores")
            .get(access_1.authenticate, access_1.authorize, this.supplierController.getAll.bind(this.supplierController));
        app
            .route("/api/proveedores/:id")
            .get(access_1.authenticate, access_1.authorize, this.supplierController.getOne.bind(this.supplierController));
        app
            .route("/api/proveedores")
            .post(access_1.authenticate, access_1.authorize, this.supplierController.create.bind(this.supplierController));
        app
            .route("/api/proveedores/:id")
            .put(access_1.authenticate, access_1.authorize, this.supplierController.updatePut.bind(this.supplierController))
            .patch(access_1.authenticate, access_1.authorize, this.supplierController.updatePatch.bind(this.supplierController));
        app
            .route("/api/proveedores/:id")
            .delete(access_1.authenticate, access_1.authorize, this.supplierController.deletePhysical.bind(this.supplierController));
        app
            .route("/api/proveedores/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.supplierController.deleteLogical.bind(this.supplierController));
    }
}
exports.SupplierRoutes = SupplierRoutes;
//# sourceMappingURL=supplier.routes.js.map