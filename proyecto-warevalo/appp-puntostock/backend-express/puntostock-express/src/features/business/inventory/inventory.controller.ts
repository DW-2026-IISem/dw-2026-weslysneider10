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
  // (rellenar en el siguiente paso) getAll, luego getOne

  // ================== CREATE ==================
  // (rellenar en el siguiente paso)

  // ================== UPDATE ==================
  // (rellenar en el siguiente paso)

  // ================== LOW STOCK ==================
  // (rellenar más adelante)

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
