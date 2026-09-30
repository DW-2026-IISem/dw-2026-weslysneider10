import { Application } from "express";
import { PurchaseController } from "./purchase.controller";

export class PurchaseRoutes {
  public purchaseController: PurchaseController = new PurchaseController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // (rellenar en los siguientes pasos)
  }
}
