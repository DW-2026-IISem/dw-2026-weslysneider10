import { Application } from "express";
import { PaymentController } from "./payment.controller";
import { authenticate, authorize } from "../../auth/access";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    app
      .route("/api/pagos")
      .get(authenticate, authorize, this.paymentController.getAll.bind(this.paymentController));

    app
      .route("/api/pagos/:id")
      .get(authenticate, authorize, this.paymentController.getOne.bind(this.paymentController));

    app
      .route("/api/pagos")
      .post(authenticate, authorize, this.paymentController.create.bind(this.paymentController));

    app
      .route("/api/pagos/:id")
      .put(authenticate, authorize, this.paymentController.updatePut.bind(this.paymentController))
      .patch(authenticate, authorize, this.paymentController.updatePatch.bind(this.paymentController));

    app
      .route("/api/pagos/:id")
      .delete(
        authenticate,
        authorize,
        this.paymentController.deletePhysical.bind(this.paymentController)
      );
  }
}
