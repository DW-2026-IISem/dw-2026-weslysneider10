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

    // low-stock (DEBE ir antes de /:id para que Express no lo confunda con un id)
    app
      .route("/api/inventarios/low-stock")
      .get(this.inventoryController.getLowStock.bind(this.inventoryController));

    // getOne
    app
      .route("/api/inventarios/:id")
      .get(this.inventoryController.getOne.bind(this.inventoryController));

    // create
    app
      .route("/api/inventarios")
      .post(this.inventoryController.create.bind(this.inventoryController));

    // update (PUT / PATCH)
    app
      .route("/api/inventarios/:id")
      .put(this.inventoryController.updatePut.bind(this.inventoryController))
      .patch(this.inventoryController.updatePatch.bind(this.inventoryController));

    // delete físico
    app
      .route("/api/inventarios/:id")
      .delete(this.inventoryController.deletePhysical.bind(this.inventoryController));
  }
}
