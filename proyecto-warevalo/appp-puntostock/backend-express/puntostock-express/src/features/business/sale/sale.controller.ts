import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateSaleDto } from "./dto";
import { SaleService } from "./sale.service";

/**
 * Capa Controller del feature Sale.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una venta se modifica a través de sus
 * propias operaciones de negocio (cancel), no por edición libre.
 */
export class SaleController extends BaseController {
  public constructor(
    private readonly service: SaleService = new SaleService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const { clientId, branchId, estado } = req.query;
      const sales = await this.service.getAll({
        clientId: clientId ? Number(clientId) : undefined,
        branchId: branchId ? Number(branchId) : undefined,
        estado: estado ? String(estado) : undefined,
      });
      res.status(200).json({ sales });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const sale = await this.service.getOne(this.paramId(req));
      res.status(200).json({ sale });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const sale = await this.service.create(req.body as CreateSaleDto);
      res.status(201).json({ sale });
    });
  }

  // ================== CANCEL ==================
  public async cancel(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const sale = await this.service.cancel(this.paramId(req));
      res.status(200).json({ sale });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en transacción. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Sale permanently deleted", id });
    });
  }
}
