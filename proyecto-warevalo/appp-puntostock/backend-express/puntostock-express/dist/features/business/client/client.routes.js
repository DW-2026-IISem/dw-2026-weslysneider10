"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const client_controller_1 = require("./client.controller");
class ClientRoutes {
    constructor() {
        this.clientController = new client_controller_1.ClientController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/clientes")
            .get(this.clientController.getAll.bind(this.clientController));
        // getOne
        app
            .route("/api/clientes/:id")
            .get(this.clientController.getOne.bind(this.clientController));
        // create
        app
            .route("/api/clientes")
            .post(this.clientController.create.bind(this.clientController));
        // update (PUT / PATCH)
        app
            .route("/api/clientes/:id")
            .put(this.clientController.updatePut.bind(this.clientController))
            .patch(this.clientController.updatePatch.bind(this.clientController));
    }
}
exports.ClientRoutes = ClientRoutes;
//# sourceMappingURL=client.routes.js.map