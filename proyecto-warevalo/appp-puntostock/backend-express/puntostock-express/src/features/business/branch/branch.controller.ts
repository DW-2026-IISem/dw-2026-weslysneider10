import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateBranchDto, PatchBranchDto, UpdateBranchDto } from "./dto";
import { BranchService } from "./branch.service";

/**
 * Capa Controller del feature Branch.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
export class BranchController extends BaseController {
  public constructor(
    private readonly service: BranchService = new BranchService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branches = await this.service.getAll();
      res.status(200).json({ branches });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.getOne(this.paramId(req));
      res.status(200).json({ branch });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.create(req.body as CreateBranchDto);
      res.status(201).json({ branch });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateBranchDto
      );
      res.status(200).json({ branch });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchBranchDto
      );
      res.status(200).json({ branch });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Branch permanently deleted", id });
    });
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const branch = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Branch deactivated (logical delete)", branch });
    });
  }
}
