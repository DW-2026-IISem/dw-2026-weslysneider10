import { Application } from "express";
import { InventoryController } from "./inventory.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Inventory — modalidad JWT + RBAC en todas las operaciones. */
export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/inventarios")
      .get(
        authenticate,
        authorize,
        this.inventoryController.getAll.bind(this.inventoryController)
      );

    // low-stock (DEBE ir antes de /:id para que Express no lo confunda con un id)
    app
      .route("/api/inventarios/low-stock")
      .get(
        authenticate,
        authorize,
        this.inventoryController.getLowStock.bind(this.inventoryController)
      );

    // getOne
    app
      .route("/api/inventarios/:id")
      .get(
        authenticate,
        authorize,
        this.inventoryController.getOne.bind(this.inventoryController)
      );

    // create
    app
      .route("/api/inventarios")
      .post(
        authenticate,
        authorize,
        this.inventoryController.create.bind(this.inventoryController)
      );

    // update (PUT / PATCH)
    app
      .route("/api/inventarios/:id")
      .put(
        authenticate,
        authorize,
        this.inventoryController.updatePut.bind(this.inventoryController)
      )
      .patch(
        authenticate,
        authorize,
        this.inventoryController.updatePatch.bind(this.inventoryController)
      );

    // delete físico
    app
      .route("/api/inventarios/:id")
      .delete(
        authenticate,
        authorize,
        this.inventoryController.deletePhysical.bind(this.inventoryController)
      );
  }
}
