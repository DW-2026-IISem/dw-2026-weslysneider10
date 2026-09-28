import { Application } from "express";
import { SupplierController } from "./supplier.controller";

export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // (rellenar en los siguientes pasos)
  }
}
