import { Application } from "express";
import { InventoryController } from "./inventory.controller";

export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // (rellenar en los siguientes pasos)
  }
}
