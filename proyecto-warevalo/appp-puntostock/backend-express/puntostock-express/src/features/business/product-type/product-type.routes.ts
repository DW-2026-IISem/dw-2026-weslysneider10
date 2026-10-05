import { Application } from "express";
import { ProductTypeController } from "./product-type.controller";
import { authenticate, authorize } from "../../auth/access";

export class ProductTypeRoutes {
  public productTypeController: ProductTypeController = new ProductTypeController();

  public routes(app: Application): void {
    app
      .route("/api/tipos-producto")
      .get(authenticate, authorize, this.productTypeController.getAll.bind(this.productTypeController));

    app
      .route("/api/tipos-producto/:id")
      .get(authenticate, authorize, this.productTypeController.getOne.bind(this.productTypeController));

    app
      .route("/api/tipos-producto")
      .post(authenticate, authorize, this.productTypeController.create.bind(this.productTypeController));

    app
      .route("/api/tipos-producto/:id")
      .put(authenticate, authorize, this.productTypeController.updatePut.bind(this.productTypeController))
      .patch(authenticate, authorize, this.productTypeController.updatePatch.bind(this.productTypeController));

    app
      .route("/api/tipos-producto/:id")
      .delete(
        authenticate,
        authorize,
        this.productTypeController.deletePhysical.bind(this.productTypeController)
      );

    app
      .route("/api/tipos-producto/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.productTypeController.deleteLogical.bind(this.productTypeController)
      );
  }
}
