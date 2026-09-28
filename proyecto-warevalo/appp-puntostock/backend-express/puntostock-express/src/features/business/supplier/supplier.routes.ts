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

    // create
    app
      .route("/api/proveedores")
      .post(this.supplierController.create.bind(this.supplierController));

    // update (PUT / PATCH)
    app
      .route("/api/proveedores/:id")
      .put(this.supplierController.updatePut.bind(this.supplierController))
      .patch(this.supplierController.updatePatch.bind(this.supplierController));

    // delete físico
    app
      .route("/api/proveedores/:id")
      .delete(this.supplierController.deletePhysical.bind(this.supplierController));

    // delete lógico
    app
      .route("/api/proveedores/:id/deactivate")
      .patch(this.supplierController.deleteLogical.bind(this.supplierController));
  }
}
