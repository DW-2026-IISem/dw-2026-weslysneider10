import { Request, Response } from "express";
import {
  Purchase,
  PurchaseDetail,
  PurchaseI,
  PurchaseDetailI,
} from "./purchase.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class PurchaseController {

  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const purchases = await Purchase.findAll();

      res.status(200).json({ purchases });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching purchases",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        res.status(404).json({
          error: "Purchase not found",
        });
        return;
      }

      res.status(200).json({ purchase });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching purchase",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================
  // (rellenar en el siguiente paso)

  // ================== UPDATE ==================
  // (rellenar en el siguiente paso)

  // ================== DETAILS ==================
  // (rellenar más adelante)

  // ================== RECEIVE ==================
  // (rellenar más adelante)

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
