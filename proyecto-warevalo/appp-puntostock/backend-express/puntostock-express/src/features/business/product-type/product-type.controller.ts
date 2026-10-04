import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateProductTypeDto, PatchProductTypeDto, UpdateProductTypeDto } from "./dto";
import { ProductTypeService } from "./product-type.service";

/**
 * Capa Controller del feature ProductType.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
export class ProductTypeController extends BaseController {
  public constructor(
    private readonly service: ProductTypeService = new ProductTypeService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productTypes = await this.service.getAll();
      res.status(200).json({ productTypes });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productType = await this.service.getOne(this.paramId(req));
      res.status(200).json({ productType });
    });
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productType = await this.service.create(req.body as CreateProductTypeDto);
      res.status(201).json({ productType });
    });
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productType = await this.service.updatePut(
        this.paramId(req),
        req.body as UpdateProductTypeDto
      );
      res.status(200).json({ productType });
    });
  }

  public async updatePatch(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productType = await this.service.updatePatch(
        this.paramId(req),
        req.body as PatchProductTypeDto
      );
      res.status(200).json({ productType });
    });
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      await this.service.deletePhysical(id);
      res.status(200).json({ message: "Product type permanently deleted", id });
    });
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const productType = await this.service.deleteLogical(this.paramId(req));
      res.status(200).json({ message: "Product type deactivated (logical delete)", productType });
    });
  }
}
