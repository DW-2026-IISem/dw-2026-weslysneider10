import { Request, Response } from "express";
import { Supplier, SupplierI } from "./supplier.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class SupplierController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const suppliers = await Supplier.findAll({
        where: { isActive: true },
      });
      res.status(200).json({ suppliers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching suppliers", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier not found" });
        return;
      }
      res.status(200).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error fetching supplier", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as SupplierI;
      const supplier = await Supplier.create({
        nit: body.nit,
        razonSocial: body.razonSocial,
        contacto: body.contacto ?? null,
        telefono: body.telefono ?? null,
        email: body.email ?? null,
        isActive: body.isActive ?? true,
      });
      res.status(201).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error creating supplier", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as SupplierI;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier not found" });
        return;
      }
      await supplier.update({
        nit: body.nit,
        razonSocial: body.razonSocial,
        contacto: body.contacto ?? null,
        telefono: body.telefono ?? null,
        email: body.email ?? null,
        isActive: body.isActive ?? supplier.isActive,
      });
      res.status(200).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error updating supplier (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<SupplierI>;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier not found" });
        return;
      }
      await supplier.update(body);
      res.status(200).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error updating supplier (PATCH)", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
