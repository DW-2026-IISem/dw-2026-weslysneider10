import { Application } from "express";
import { SaleController } from "./sale.controller";

export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/ventas")
      .get(this.saleController.getAll.bind(this.saleController));

    // getOne
    app
      .route("/api/ventas/:id")
      .get(this.saleController.getOne.bind(this.saleController));

    // create
    app
      .route("/api/ventas")
      .post(this.saleController.create.bind(this.saleController));

    // cancel
    app
      .route("/api/ventas/:id/cancel")
      .patch(this.saleController.cancel.bind(this.saleController));

    // delete físico
    app
      .route("/api/ventas/:id")
      .delete(this.saleController.deletePhysical.bind(this.saleController));
  }
}
