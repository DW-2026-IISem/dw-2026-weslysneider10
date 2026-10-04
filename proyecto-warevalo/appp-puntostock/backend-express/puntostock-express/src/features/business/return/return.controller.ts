import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import { Return, ReturnI } from "./return.model";
import { SaleDetail } from "../sale/sale-detail.model";
import { Sale } from "../sale/sale.model";
import { Inventory } from "../inventory/inventory.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

interface CreateReturnBody {
  saleDetailId: number;
  motivo: string;
  cantidad: number;
}

export class ReturnController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const { saleDetailId, estado } = req.query;
      const where: Record<string, unknown> = {};

      if (saleDetailId) where.saleDetailId = Number(saleDetailId);
      if (estado) where.estado = String(estado);

      const returns = await Return.findAll({ where, order: [["createdAt", "DESC"]] });
      res.status(200).json({ returns });
    } catch (error) {
      res.status(500).json({ error: "Error fetching returns", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const ret = await Return.findByPk(id);
      if (!ret) {
        res.status(404).json({ error: "Return not found" });
        return;
      }
      res.status(200).json({ return: ret });
    } catch (error) {
      res.status(500).json({ error: "Error fetching return", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as CreateReturnBody;

      if (body.cantidad <= 0) {
        res.status(400).json({ error: "La cantidad a devolver debe ser mayor a 0" });
        return;
      }

      const saleDetail = await SaleDetail.findByPk(body.saleDetailId);
      if (!saleDetail) {
        res.status(404).json({ error: "SaleDetail not found" });
        return;
      }

      const sale = await Sale.findByPk(saleDetail.saleId);
      if (!sale || sale.estado === "cancelled") {
        res.status(400).json({ error: "No se puede devolver una línea de una venta cancelada o inexistente" });
        return;
      }

      const previousReturns = await Return.findAll({
        where: { saleDetailId: body.saleDetailId, estado: "approved" },
      });
      const alreadyReturned = previousReturns.reduce((sum, r) => sum + r.cantidad, 0);

      if (alreadyReturned + body.cantidad > saleDetail.cantidad) {
        res.status(400).json({
          error: `La cantidad a devolver supera lo vendido en esa línea (vendido: ${saleDetail.cantidad}, ya devuelto: ${alreadyReturned})`,
        });
        return;
      }

      const total = body.cantidad * Number(saleDetail.valorUnitario);

      const ret = await Return.create({
        saleDetailId: body.saleDetailId,
        fecha: new Date(),
        motivo: body.motivo,
        cantidad: body.cantidad,
        total,
        estado: "pending",
      });

      res.status(201).json({ return: ret });
    } catch (error) {
      res.status(500).json({ error: "Error creating return", detail: String(error) });
    }
  }

  // ================== APPROVE / REJECT ==================
  public async approve(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const id = paramId(req);
      const ret = await Return.findByPk(id, { transaction: t });

      if (!ret) {
        await t.rollback();
        res.status(404).json({ error: "Return not found" });
        return;
      }

      if (ret.estado !== "pending") {
        await t.rollback();
        res.status(400).json({ error: `No se puede aprobar una devolución en estado '${ret.estado}'` });
        return;
      }

      const saleDetail = await SaleDetail.findByPk(ret.saleDetailId, { transaction: t });
      if (!saleDetail) {
        await t.rollback();
        res.status(404).json({ error: "SaleDetail not found" });
        return;
      }

      const sale = await Sale.findByPk(saleDetail.saleId, { transaction: t });
      if (!sale) {
        await t.rollback();
        res.status(404).json({ error: "Sale not found" });
        return;
      }

      const inventory = await Inventory.findOne({
        where: { branchId: sale.branchId, productId: saleDetail.productId },
        transaction: t,
      });

      if (inventory) {
        await inventory.update(
          { quantity: inventory.quantity + ret.cantidad },
          { transaction: t }
        );
      } else {
        await Inventory.create(
          {
            branchId: sale.branchId,
            productId: saleDetail.productId,
            quantity: ret.cantidad,
            minStock: 0,
          },
          { transaction: t }
        );
      }

      await ret.update({ estado: "approved" }, { transaction: t });

      await t.commit();
      res.status(200).json({ return: ret });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error approving return", detail: String(error) });
    }
  }

  public async reject(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const ret = await Return.findByPk(id);

      if (!ret) {
        res.status(404).json({ error: "Return not found" });
        return;
      }

      if (ret.estado !== "pending") {
        res.status(400).json({ error: `No se puede rechazar una devolución en estado '${ret.estado}'` });
        return;
      }

      await ret.update({ estado: "rejected" });
      res.status(200).json({ return: ret });
    } catch (error) {
      res.status(500).json({ error: "Error rejecting return", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física. No se permite borrar una ya aprobada (se perdería la trazabilidad del ajuste a Inventory). */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const ret = await Return.findByPk(id);
      if (!ret) {
        res.status(404).json({ error: "Return not found" });
        return;
      }

      if (ret.estado === "approved") {
        res.status(400).json({ error: "No se puede eliminar una devolución ya aprobada" });
        return;
      }

      await ret.destroy();
      res.status(200).json({ message: "Return permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting return", detail: String(error) });
    }
  }
}
