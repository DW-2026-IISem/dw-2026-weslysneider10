import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateReturnDto } from "./dto";
import { ReturnService } from "./return.service";

/**
 * Capa Controller del feature Return.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una devolución se modifica a través de
 * sus propias operaciones de negocio (approve, reject).
 */
export class ReturnController extends BaseController {
  public constructor(
    private readonly service: ReturnService = new ReturnService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const { saleDetailId, estado } = req.query;
      const returns = await this.service.getAll({
        saleDetailId: saleDetailId ? Number(saleDetailId) : undefined,
        estado: estado ? String(estado) : undefined,
      });
      res.status(200).json({ returns });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ret = await this.service.getOne(this.paramId(req));
      res.status(200).json({ return: ret });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ret = await this.service.create(req.body as CreateReturnDto);
      res.status(201).json({ return: ret });
    });
  }

  // ================== APPROVE / REJECT ==================
  public async approve(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ret = await this.service.approve(this.paramId(req));
      res.status(200).json({ return: ret });
    });
  }

  public async reject(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const ret = await this.service.reject(this.paramId(req));
      res.status(200).json({ return: ret });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. Bloqueada si ya está `approved`. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Return permanently deleted", id });
    });
  }
}
