import { Application } from "express";
import { SupplierController } from "./supplier.controller";

export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/proveedores")
      .get(this.supplierController.getAll.bind(this.supplierController));

    // getOne
    app
      .route("/api/proveedores/:id")
      .get(this.supplierController.getOne.bind(this.supplierController));

    // (rellenar en los siguientes pasos: create, update, delete)
  }
}
