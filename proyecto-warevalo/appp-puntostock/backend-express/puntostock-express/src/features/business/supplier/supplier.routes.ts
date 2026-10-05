import { Application } from "express";
import { SupplierController } from "./supplier.controller";
import { authenticate, authorize } from "../../auth/access";

export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    app
      .route("/api/proveedores")
      .get(authenticate, authorize, this.supplierController.getAll.bind(this.supplierController));

    app
      .route("/api/proveedores/:id")
      .get(authenticate, authorize, this.supplierController.getOne.bind(this.supplierController));

    app
      .route("/api/proveedores")
      .post(authenticate, authorize, this.supplierController.create.bind(this.supplierController));

    app
      .route("/api/proveedores/:id")
      .put(authenticate, authorize, this.supplierController.updatePut.bind(this.supplierController))
      .patch(authenticate, authorize, this.supplierController.updatePatch.bind(this.supplierController));

    app
      .route("/api/proveedores/:id")
      .delete(
        authenticate,
        authorize,
        this.supplierController.deletePhysical.bind(this.supplierController)
      );

    app
      .route("/api/proveedores/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.supplierController.deleteLogical.bind(this.supplierController)
      );
  }
}
