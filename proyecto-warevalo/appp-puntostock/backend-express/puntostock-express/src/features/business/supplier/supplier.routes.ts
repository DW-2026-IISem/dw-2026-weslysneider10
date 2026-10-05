import { Application } from "express";
import { SupplierController } from "./supplier.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Supplier — modalidad JWT + RBAC en todas las operaciones. */
export class SupplierRoutes {
  public supplierController: SupplierController = new SupplierController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/proveedores")
      .get(authenticate, authorize, this.supplierController.getAll.bind(this.supplierController));

    // getOne
    app
      .route("/api/proveedores/:id")
      .get(authenticate, authorize, this.supplierController.getOne.bind(this.supplierController));

    // create
    app
      .route("/api/proveedores")
      .post(
        authenticate,
        authorize,
        this.supplierController.create.bind(this.supplierController)
      );

    // update (PUT / PATCH)
    app
      .route("/api/proveedores/:id")
      .put(
        authenticate,
        authorize,
        this.supplierController.updatePut.bind(this.supplierController)
      )
      .patch(
        authenticate,
        authorize,
        this.supplierController.updatePatch.bind(this.supplierController)
      );

    // delete físico
    app
      .route("/api/proveedores/:id")
      .delete(
        authenticate,
        authorize,
        this.supplierController.deletePhysical.bind(this.supplierController)
      );

    // delete lógico
    app
      .route("/api/proveedores/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.supplierController.deleteLogical.bind(this.supplierController)
      );
  }
}
