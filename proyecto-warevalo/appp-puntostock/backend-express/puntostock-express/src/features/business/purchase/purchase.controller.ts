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
  // (rellenar en el siguiente paso) getAll, luego getOne

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
