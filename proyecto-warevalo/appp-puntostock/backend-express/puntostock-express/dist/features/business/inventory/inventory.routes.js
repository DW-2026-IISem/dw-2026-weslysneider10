"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const inventory_controller_1 = require("./inventory.controller");
const access_1 = require("../../auth/access");
class InventoryRoutes {
    constructor() {
        this.inventoryController = new inventory_controller_1.InventoryController();
    }
    routes(app) {
        app
            .route("/api/inventarios")
            .get(access_1.authenticate, access_1.authorize, this.inventoryController.getAll.bind(this.inventoryController));
        app
            .route("/api/inventarios/low-stock")
            .get(access_1.authenticate, access_1.authorize, this.inventoryController.getLowStock.bind(this.inventoryController));
        app
            .route("/api/inventarios/:id")
            .get(access_1.authenticate, access_1.authorize, this.inventoryController.getOne.bind(this.inventoryController));
        app
            .route("/api/inventarios")
            .post(access_1.authenticate, access_1.authorize, this.inventoryController.create.bind(this.inventoryController));
        app
            .route("/api/inventarios/:id")
            .put(access_1.authenticate, access_1.authorize, this.inventoryController.updatePut.bind(this.inventoryController))
            .patch(access_1.authenticate, access_1.authorize, this.inventoryController.updatePatch.bind(this.inventoryController));
        app
            .route("/api/inventarios/:id")
            .delete(access_1.authenticate, access_1.authorize, this.inventoryController.deletePhysical.bind(this.inventoryController));
    }
}
exports.InventoryRoutes = InventoryRoutes;
//# sourceMappingURL=inventory.routes.js.map