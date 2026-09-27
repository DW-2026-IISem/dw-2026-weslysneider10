import { Request, Response } from "express";

import { Client, ClientI } from "./client.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class ClientController {

  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const clients = await Client.findAll({
        where: { status: "active" },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({ clients });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching clients",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const client = await Client.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching client",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as ClientI;

      const client = await Client.create({
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
        password: body.password,
        status: body.status ?? "active",
      });

      const { password, ...safe } =
        client.toJSON() as ClientI & { password?: string };

      res.status(201).json({ client: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error creating client",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as ClientI;

      const client = await Client.findByPk(id);

      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      await client.update({
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
        password: body.password ?? client.password,
        status: body.status ?? client.status,
      });

      const { password, ...safe } =
        client.toJSON() as ClientI & { password?: string };

      res.status(200).json({ client: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error updating client (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<ClientI>;

      const client = await Client.findByPk(id);

      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      await client.update(body);

      const { password, ...safe } =
        client.toJSON() as ClientI & { password?: string };

      res.status(200).json({ client: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error updating client (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================

  // (rellenar en ISS-03-E)

}
