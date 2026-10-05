import { Application } from "express";
import { ProductController } from "./product.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Product — modalidad JWT + RBAC en todas las operaciones. */
export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/productos")
      .get(authenticate, authorize, this.productController.getAll.bind(this.productController));

    // getOne
    app
      .route("/api/productos/:id")
      .get(authenticate, authorize, this.productController.getOne.bind(this.productController));

    // create
    app
      .route("/api/productos")
      .post(authenticate, authorize, this.productController.create.bind(this.productController));

    // update (PUT / PATCH)
    app
      .route("/api/productos/:id")
      .put(authenticate, authorize, this.productController.updatePut.bind(this.productController))
      .patch(
        authenticate,
        authorize,
        this.productController.updatePatch.bind(this.productController)
      );

    // delete físico
    app
      .route("/api/productos/:id")
      .delete(
        authenticate,
        authorize,
        this.productController.deletePhysical.bind(this.productController)
      );

    // delete lógico
    app
      .route("/api/productos/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.productController.deleteLogical.bind(this.productController)
      );
  }
}
