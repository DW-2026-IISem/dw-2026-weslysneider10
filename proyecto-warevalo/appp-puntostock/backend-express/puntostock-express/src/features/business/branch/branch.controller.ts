import { Request, Response } from "express";
import { Branch, BranchI } from "./branch.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class BranchController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const branches = await Branch.findAll({
        where: { status: "active" },
      });
      res.status(200).json({ branches });
    } catch (error) {
      res.status(500).json({ error: "Error fetching branches", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      res.status(200).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error fetching branch", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as BranchI;
      const branch = await Branch.create({
        name: body.name,
        description: body.description ?? null,
        status: body.status ?? "active",
      });
      res.status(201).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error creating branch", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as BranchI;
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.update({
        name: body.name,
        description: body.description ?? null,
        status: body.status ?? branch.status,
      });
      res.status(200).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error updating branch (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<BranchI>;
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.update(body);
      res.status(200).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error updating branch (PATCH)", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.destroy();
      res.status(200).json({ message: "Branch permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting branch", detail: String(error) });
    }
  }

  /** Eliminación lógica → status = inactive */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.update({ status: "inactive" });
      res.status(200).json({
        message: "Branch deactivated (logical delete)",
        branch,
      });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating branch", detail: String(error) });
    }
  }
}
