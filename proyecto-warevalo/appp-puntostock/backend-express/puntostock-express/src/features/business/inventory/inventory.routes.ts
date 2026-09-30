import { Application } from "express";
import { InventoryController } from "./inventory.controller";

export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/inventarios")
      .get(this.inventoryController.getAll.bind(this.inventoryController));

    // getOne
    app
      .route("/api/inventarios/:id")
      .get(this.inventoryController.getOne.bind(this.inventoryController));

    // (rellenar en los siguientes pasos: create, update, low-stock, delete)
  }
}
