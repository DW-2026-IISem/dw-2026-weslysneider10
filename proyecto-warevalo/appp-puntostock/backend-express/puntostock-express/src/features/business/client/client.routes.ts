import { Express } from "express";
import { ClientController } from "./client.controller.js";

export class ClientRoutes {

  constructor(
    private readonly clientController: ClientController,
  ) {}

  public register(app: Express): void {

    // ================== READ ==================

    app
      .route("/api/clientes")
      .get(this.clientController.getAll.bind(this.clientController));

    app
      .route("/api/clientes/:id")
      .get(this.clientController.getOne.bind(this.clientController));

    // ================== CREATE ==================

    app
      .route("/api/clientes")
      .post(this.clientController.create.bind(this.clientController));

    // ================== UPDATE ==================

    // PUT - reemplazo completo
    app
      .route("/api/clientes/:id")
      .put(this.clientController.updatePut.bind(this.clientController));

    // PATCH - actualización parcial
    app
      .route("/api/clientes/:id")
      .patch(this.clientController.updatePatch.bind(this.clientController));
  }
}
