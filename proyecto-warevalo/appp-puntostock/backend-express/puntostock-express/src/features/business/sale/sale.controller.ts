import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import { Sale, SaleI } from "./sale.model";
import { SaleDetail, SaleDetailI } from "./sale-detail.model";
import { Client } from "../client/client.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { Inventory } from "../inventory/inventory.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

interface CreateSaleItemBody {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}

interface CreateSaleBody {
  clientId: number;
  branchId: number;
  impuestos?: number;
  items: CreateSaleItemBody[];
}

export class SaleController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const { clientId, branchId, estado } = req.query;
      const where: Record<string, unknown> = {};

      if (clientId) where.clientId = Number(clientId);
      if (branchId) where.branchId = Number(branchId);
      if (estado) where.estado = String(estado);

      const sales = await Sale.findAll({
        where,
        include: [{ model: SaleDetail, as: "items" }],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ sales });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sales", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id, {
        include: [{ model: SaleDetail, as: "items" }],
      });
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.status(200).json({ sale });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const body = req.body as CreateSaleBody;

      if (!body.items || body.items.length === 0) {
        await t.rollback();
        res.status(400).json({ error: "La venta debe tener al menos un item" });
        return;
      }

      const client = await Client.findByPk(body.clientId, { transaction: t });
      if (!client) {
        await t.rollback();
        res.status(404).json({ error: "Client not found" });
        return;
      }

      const branch = await Branch.findByPk(body.branchId, { transaction: t });
      if (!branch) {
        await t.rollback();
        res.status(404).json({ error: "Branch not found" });
        return;
      }

      let subtotal = 0;
      const inventories: Inventory[] = [];

      for (const item of body.items) {
        const product = await Product.findByPk(item.productId, { transaction: t });
        if (!product) {
          await t.rollback();
          res.status(404).json({ error: `Product not found: ${item.productId}` });
          return;
        }
        if (item.cantidad <= 0 || item.valorUnitario <= 0) {
          await t.rollback();
          res.status(400).json({ error: "cantidad y valorUnitario deben ser mayores a 0" });
          return;
        }

        const inventory = await Inventory.findOne({
          where: { branchId: body.branchId, productId: item.productId },
          transaction: t,
        });

        if (!inventory || inventory.quantity < item.cantidad) {
          await t.rollback();
          res.status(400).json({
            error: `Disponibilidad insuficiente para el producto '${item.productId}' en la sucursal '${body.branchId}'`,
          });
          return;
        }

        inventories.push(inventory);
        subtotal += item.cantidad * item.valorUnitario;
      }

      const impuestos = body.impuestos ?? 0;
      const total = subtotal + impuestos;

      const sale = await Sale.create(
        {
          clientId: body.clientId,
          branchId: body.branchId,
          fecha: new Date(),
          subtotal,
          impuestos,
          total,
          estado: "completed",
        },
        { transaction: t }
      );

      for (let i = 0; i < body.items.length; i++) {
        const item = body.items[i];
        const inventory = inventories[i];

        await SaleDetail.create(
          {
            saleId: sale.id,
            productId: item.productId,
            cantidad: item.cantidad,
            valorUnitario: item.valorUnitario,
            total: item.cantidad * item.valorUnitario,
            observaciones: item.observaciones ?? null,
          },
          { transaction: t }
        );

        await inventory.update(
          { quantity: inventory.quantity - item.cantidad },
          { transaction: t }
        );
      }

      await t.commit();

      const created = await Sale.findByPk(sale.id, {
        include: [{ model: SaleDetail, as: "items" }],
      });
      res.status(201).json({ sale: created });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error creating sale", detail: String(error) });
    }
  }

  // ================== CANCEL ==================
  public async cancel(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id, {
        include: [{ model: SaleDetail, as: "items" }],
        transaction: t,
      });

      if (!sale) {
        await t.rollback();
        res.status(404).json({ error: "Sale not found" });
        return;
      }

      if (sale.estado === "cancelled") {
        await t.rollback();
        res.status(400).json({ error: "La venta ya está cancelada" });
        return;
      }

      const items = (sale as any).items as SaleDetail[];

      for (const item of items) {
        const inventory = await Inventory.findOne({
          where: { branchId: sale.branchId, productId: item.productId },
          transaction: t,
        });

        if (inventory) {
          await inventory.update(
            { quantity: inventory.quantity + item.cantidad },
            { transaction: t }
          );
        } else {
          await Inventory.create(
            {
              branchId: sale.branchId,
              productId: item.productId,
              quantity: item.cantidad,
              minStock: 0,
            },
            { transaction: t }
          );
        }
      }

      await sale.update({ estado: "cancelled" }, { transaction: t });

      await t.commit();

      const updated = await Sale.findByPk(id, {
        include: [{ model: SaleDetail, as: "items" }],
      });
      res.status(200).json({ sale: updated });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error cancelling sale", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en transacción (no restaura inventario). */
  public async deletePhysical(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id, { transaction: t });
      if (!sale) {
        await t.rollback();
        res.status(404).json({ error: "Sale not found" });
        return;
      }

      await SaleDetail.destroy({ where: { saleId: id }, transaction: t });
      await sale.destroy({ transaction: t });

      await t.commit();
      res.status(200).json({ message: "Sale permanently deleted", id });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error deleting sale", detail: String(error) });
    }
  }
}
