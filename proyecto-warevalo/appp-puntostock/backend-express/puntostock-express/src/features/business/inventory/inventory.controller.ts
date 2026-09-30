import { Request, Response } from "express";
import { Op, col, where as sequelizeWhere } from "sequelize";
import { Inventory, InventoryI } from "./inventory.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class InventoryController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const { branchId, productId } = req.query;
      const where: Record<string, unknown> = {};

      if (branchId) where.branchId = Number(branchId);
      if (productId) where.productId = Number(productId);

      const inventories = await Inventory.findAll({ where });
      res.status(200).json({ inventories });
    } catch (error) {
      res.status(500).json({ error: "Error fetching inventories", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }
      res.status(200).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error fetching inventory", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as InventoryI;

      const branch = await Branch.findByPk(body.branchId);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }

      const product = await Product.findByPk(body.productId);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const existing = await Inventory.findOne({
        where: { branchId: body.branchId, productId: body.productId },
      });
      if (existing) {
        res.status(409).json({
          error: `Ya existe un registro de inventario para la sucursal '${body.branchId}' y el producto '${body.productId}'`,
        });
        return;
      }

      const inventory = await Inventory.create({
        branchId: body.branchId,
        productId: body.productId,
        quantity: body.quantity ?? 0,
        minStock: body.minStock ?? 0,
      });
      res.status(201).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error creating inventory", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Pick<InventoryI, "quantity" | "minStock">;
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }
      await inventory.update({
        quantity: body.quantity,
        minStock: body.minStock,
      });
      res.status(200).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error updating inventory (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<Pick<InventoryI, "quantity" | "minStock">>;
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }
      await inventory.update(body);
      res.status(200).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error updating inventory (PATCH)", detail: String(error) });
    }
  }

  // ================== LOW STOCK ==================
  /** Alertas de reposición: cantidad <= stock_minimo */
  public async getLowStock(req: Request, res: Response) {
    try {
      const { branchId } = req.query;
      const where: Record<string, unknown> = {
        [Op.and]: [sequelizeWhere(col("quantity"), Op.lte, col("minStock"))],
      };

      if (branchId) where.branchId = Number(branchId);

      const inventories = await Inventory.findAll({
        where,
        order: [["quantity", "ASC"]],
      });
      res.status(200).json({ inventories });
    } catch (error) {
      res.status(500).json({ error: "Error fetching low stock", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física (no hay borrado lógico: Inventario no tiene status/isActive) */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory not found" });
        return;
      }
      await inventory.destroy();
      res.status(200).json({ message: "Inventory permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting inventory", detail: String(error) });
    }
  }
}
