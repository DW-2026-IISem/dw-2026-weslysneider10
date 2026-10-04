import { Application } from "express";
import { PaymentController } from "./payment.controller";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    app.get(
      "/api/payments",
      this.paymentController.getAll.bind(this.paymentController)
    );

    app.get(
      "/api/payments/:id",
      this.paymentController.getOne.bind(this.paymentController)
    );

    app.post(
      "/api/payments",
      this.paymentController.create.bind(this.paymentController)
    );

    app.put(
      "/api/payments/:id",
      this.paymentController.update.bind(this.paymentController)
    );

    app.patch(
      "/api/payments/:id",
      this.paymentController.update.bind(this.paymentController)
    );

    app.delete(
      "/api/payments/:id",
      this.paymentController.delete.bind(this.paymentController)
    );
  }
}
