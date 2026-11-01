"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const client_controller_1 = require("./client.controller");
const access_1 = require("../../auth/access");
class ClientRoutes {
    constructor() {
        this.clientController = new client_controller_1.ClientController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/clientes")
            .get(access_1.authenticate, access_1.authorize, this.clientController.getAll.bind(this.clientController));
        // getOne
        app
            .route("/api/clientes/:id")
            .get(access_1.authenticate, access_1.authorize, this.clientController.getOne.bind(this.clientController));
        // create
        app
            .route("/api/clientes")
            .post(access_1.authenticate, access_1.authorize, this.clientController.create.bind(this.clientController));
        // update (PUT / PATCH)
        app
            .route("/api/clientes/:id")
            .put(access_1.authenticate, access_1.authorize, this.clientController.updatePut.bind(this.clientController))
            .patch(access_1.authenticate, access_1.authorize, this.clientController.updatePatch.bind(this.clientController));
        // delete físico
        app
            .route("/api/clientes/:id")
            .delete(access_1.authenticate, access_1.authorize, this.clientController.deletePhysical.bind(this.clientController));
        // delete lógico
        app
            .route("/api/clientes/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.clientController.deleteLogical.bind(this.clientController));
    }
}
exports.ClientRoutes = ClientRoutes;
//# sourceMappingURL=client.routes.js.map