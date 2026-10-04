import { Application } from "express";
import { PaymentController } from "./payment.controller";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // getAll
    app
      .route("/api/payments")
      .get(this.paymentController.getAll.bind(this.paymentController));

    // getOne
    app
      .route("/api/payments/:id")
      .get(this.paymentController.getOne.bind(this.paymentController));

    // create
    app
      .route("/api/payments")
      .post(this.paymentController.create.bind(this.paymentController));

    // update (PUT / PATCH)
    app
      .route("/api/payments/:id")
      .put(this.paymentController.updatePut.bind(this.paymentController))
      .patch(this.paymentController.updatePatch.bind(this.paymentController));

    // cancel (antes era el delete lógico)
    app
      .route("/api/payments/:id/cancel")
      .patch(this.paymentController.cancel.bind(this.paymentController));

    // delete físico
    app
      .route("/api/payments/:id")
      .delete(this.paymentController.deletePhysical.bind(this.paymentController));
  }
}
