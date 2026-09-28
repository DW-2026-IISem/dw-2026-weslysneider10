import { Request, Response } from "express";
import { Branch, BranchI } from "./branch.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class BranchController {
  // ================== READ ==================
  // (rellenar en el siguiente paso) getAll, luego getOne

  // ================== CREATE ==================
  // (rellenar en el siguiente paso)

  // ================== UPDATE ==================
  // (rellenar en el siguiente paso)

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
