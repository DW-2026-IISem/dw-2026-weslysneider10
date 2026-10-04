import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateInventoryDto, PatchInventoryDto, UpdateInventoryDto } from "./dto";
import { InventoryService } from "./inventory.service";

/**
 * Capa Controller del feature Inventory.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
export class InventoryController extends BaseController {
  public constructor(
    private readonly service: InventoryService = new InventoryService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const { branchId, productId } = req.query;
      const inventories = await this.service.getAll({
        branchId: branchId ? Number(branchId) : undefined,
        productId: productId ? Number(productId) : undefined,
      });
      res.status(200).json({ inventories });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const inventory = await this.service.getOne(this.paramId(req));
      res.status(200).json({ inventory });
    });
  }

  // ================== LOW STOCK ==================
  public async getLowStock(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const { branchId } = req.query;
      const inventories = await this.service.getLowStock(
        branchId ? Number(branchId) : undefined
      );
      res.status(200).json({ inventories });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const inventory = await this.service.create(req.body as CreateInventoryDto);
      res.status(201).json({ inventory });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const inventory = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateInventoryDto
      );
      res.status(200).json({ inventory });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const inventory = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchInventoryDto
      );
      res.status(200).json({ inventory });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. Inventory no tiene borrado lógico. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Inventory deleted successfully", id });
    });
  }
}
