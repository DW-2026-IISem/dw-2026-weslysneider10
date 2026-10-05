import { Application } from "express";
import { PaymentController } from "./payment.controller";
import { authenticate, authorize } from "../../auth/access";

/** Rutas del feature Payment — modalidad JWT + RBAC en todas las operaciones. */
export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/payments")
      .get(authenticate, authorize, this.paymentController.getAll.bind(this.paymentController));

    // getOne
    app
      .route("/api/payments/:id")
      .get(authenticate, authorize, this.paymentController.getOne.bind(this.paymentController));

    // create
    app
      .route("/api/payments")
      .post(
        authenticate,
        authorize,
        this.paymentController.create.bind(this.paymentController)
      );

    // update (PUT / PATCH)
    app
      .route("/api/payments/:id")
      .put(
        authenticate,
        authorize,
        this.paymentController.updatePut.bind(this.paymentController)
      )
      .patch(
        authenticate,
        authorize,
        this.paymentController.updatePatch.bind(this.paymentController)
      );

    // cancel (antes era el delete lógico)
    app
      .route("/api/payments/:id/cancel")
      .patch(
        authenticate,
        authorize,
        this.paymentController.cancel.bind(this.paymentController)
      );

    // delete físico
    app
      .route("/api/payments/:id")
      .delete(
        authenticate,
        authorize,
        this.paymentController.deletePhysical.bind(this.paymentController)
      );
  }
}
