import { Application } from "express";
import { ProductController } from "./product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/productos")
      .get(this.productController.getAll.bind(this.productController));

    // getOne
    app
      .route("/api/productos/:id")
      .get(this.productController.getOne.bind(this.productController));

    // create
    app
      .route("/api/productos")
      .post(this.productController.create.bind(this.productController));

    // update (PUT / PATCH)
    app
      .route("/api/productos/:id")
      .put(this.productController.updatePut.bind(this.productController))
      .patch(this.productController.updatePatch.bind(this.productController));

    // delete físico
    app
      .route("/api/productos/:id")
      .delete(this.productController.deletePhysical.bind(this.productController));

    // delete lógico
    app
      .route("/api/productos/:id/deactivate")
      .patch(this.productController.deleteLogical.bind(this.productController));
  }
}
