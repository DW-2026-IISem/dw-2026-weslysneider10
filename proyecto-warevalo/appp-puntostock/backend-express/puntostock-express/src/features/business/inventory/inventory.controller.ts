import { Request, Response } from "express";
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
  // (rellenar en el siguiente paso)

  // ================== UPDATE ==================
  // (rellenar en el siguiente paso)

  // ================== LOW STOCK ==================
  // (rellenar más adelante)

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
