import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreatePurchaseDto, ReceivePurchaseDto } from "./dto";
import { PurchaseService } from "./purchase.service";

/**
 * Capa Controller del feature Purchase.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una compra se modifica a través de sus
 * propias operaciones de negocio (receive, cancel), no por edición libre.
 */
export class PurchaseController extends BaseController {
  public constructor(
    private readonly service: PurchaseService = new PurchaseService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const { supplierId, branchId, estado } = req.query;
      const purchases = await this.service.getAll({
        supplierId: supplierId ? Number(supplierId) : undefined,
        branchId: branchId ? Number(branchId) : undefined,
        estado: estado ? String(estado) : undefined,
      });
      res.status(200).json({ purchases });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const purchase = await this.service.getOne(this.paramId(req));
      res.status(200).json({ purchase });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const purchase = await this.service.create(req.body as CreatePurchaseDto);
      res.status(201).json({ purchase });
    });
  }

  // ================== RECEIVE ==================
  /** Recepción parcial o total de una compra. */
  public async receive(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const purchase = await this.service.receive(
        this.paramId(req),
        req.body as ReceivePurchaseDto
      );
      res.status(200).json({ purchase });
    });
  }

  // ================== CANCEL ==================
  public async cancel(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const purchase = await this.service.cancel(this.paramId(req));
      res.status(200).json({ purchase });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en transacción. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Purchase permanently deleted", id });
    });
  }
}
