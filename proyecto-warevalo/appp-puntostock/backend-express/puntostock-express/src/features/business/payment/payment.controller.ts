import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreatePaymentDto, PatchPaymentDto, UpdatePaymentDto } from "./dto";
import { PaymentService } from "./payment.service";

/**
 * Capa Controller del feature Payment.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
export class PaymentController extends BaseController {
  public constructor(
    private readonly service: PaymentService = new PaymentService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payments = await this.service.getAll();
      res.status(200).json({ payments });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payment = await this.service.getOne(this.paramId(req));
      res.status(200).json({ payment });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payment = await this.service.create(req.body as CreatePaymentDto);
      res.status(201).json({ payment });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payment = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdatePaymentDto
      );
      res.status(200).json({ payment });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payment = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchPaymentDto
      );
      res.status(200).json({ payment });
    });
  }

  // ================== CANCEL ==================
  public async cancel(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const payment = await this.service.cancel(this.paramId(req));
      res.status(200).json({ message: "Payment cancelled", payment });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Payment permanently deleted", id });
    });
  }
}
