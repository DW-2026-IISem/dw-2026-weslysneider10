import { Application } from "express";
import { InventoryController } from "./inventory.controller";
import { authenticate, authorize } from "../../auth/access";

export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    app
      .route("/api/inventarios")
      .get(authenticate, authorize, this.inventoryController.getAll.bind(this.inventoryController));

    app
      .route("/api/inventarios/low-stock")
      .get(
        authenticate,
        authorize,
        this.inventoryController.getLowStock.bind(this.inventoryController)
      );

    app
      .route("/api/inventarios/:id")
      .get(authenticate, authorize, this.inventoryController.getOne.bind(this.inventoryController));

    app
      .route("/api/inventarios")
      .post(authenticate, authorize, this.inventoryController.create.bind(this.inventoryController));

    app
      .route("/api/inventarios/:id")
      .put(authenticate, authorize, this.inventoryController.updatePut.bind(this.inventoryController))
      .patch(authenticate, authorize, this.inventoryController.updatePatch.bind(this.inventoryController));

    app
      .route("/api/inventarios/:id")
      .delete(
        authenticate,
        authorize,
        this.inventoryController.deletePhysical.bind(this.inventoryController)
      );
  }
}
