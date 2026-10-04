import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateSupplierDto, PatchSupplierDto, UpdateSupplierDto } from "./dto";
import { SupplierService } from "./supplier.service";

/**
 * Capa Controller del feature Supplier.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
export class SupplierController extends BaseController {
  public constructor(
    private readonly service: SupplierService = new SupplierService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const suppliers = await this.service.getAll();
      res.status(200).json({ suppliers });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const supplier = await this.service.getOne(this.paramId(req));
      res.status(200).json({ supplier });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const supplier = await this.service.create(req.body as CreateSupplierDto);
      res.status(201).json({ supplier });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const supplier = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateSupplierDto
      );
      res.status(200).json({ supplier });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const supplier = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchSupplierDto
      );
      res.status(200).json({ supplier });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Supplier permanently deleted", id });
    });
  }

  /** Eliminación lógica -> isActive = false. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const supplier = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Supplier deactivated (logical delete)", supplier });
    });
  }
}
