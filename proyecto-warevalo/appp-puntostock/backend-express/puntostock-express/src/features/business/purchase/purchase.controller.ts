import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import { Purchase, PurchaseI } from "./purchase.model";
import { PurchaseDetail, PurchaseDetailI } from "./purchase-detail.model";
import { Supplier } from "../supplier/supplier.model";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { Inventory } from "../inventory/inventory.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

interface CreatePurchaseItemBody {
  productId: number;
  cantidad: number;
  valorUnitario: number;
  observaciones?: string;
}

interface CreatePurchaseBody {
  supplierId: number;
  branchId: number;
  impuestos?: number;
  items: CreatePurchaseItemBody[];
}

interface ReceiveItemBody {
  productId: number;
  cantidad: number;
}

interface ReceiveBody {
  items: ReceiveItemBody[];
}

export class PurchaseController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const { supplierId, branchId, estado } = req.query;
      const where: Record<string, unknown> = {};

      if (supplierId) where.supplierId = Number(supplierId);
      if (branchId) where.branchId = Number(branchId);
      if (estado) where.estado = String(estado);

      const purchases = await Purchase.findAll({
        where,
        include: [{ model: PurchaseDetail, as: "items" }],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ purchases });
    } catch (error) {
      res.status(500).json({ error: "Error fetching purchases", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id, {
        include: [{ model: PurchaseDetail, as: "items" }],
      });
      if (!purchase) {
        res.status(404).json({ error: "Purchase not found" });
        return;
      }
      res.status(200).json({ purchase });
    } catch (error) {
      res.status(500).json({ error: "Error fetching purchase", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const body = req.body as CreatePurchaseBody;

      if (!body.items || body.items.length === 0) {
        await t.rollback();
        res.status(400).json({ error: "La compra debe tener al menos un item" });
        return;
      }

      const supplier = await Supplier.findByPk(body.supplierId, { transaction: t });
      if (!supplier) {
        await t.rollback();
        res.status(404).json({ error: "Supplier not found" });
        return;
      }

      const branch = await Branch.findByPk(body.branchId, { transaction: t });
      if (!branch) {
        await t.rollback();
        res.status(404).json({ error: "Branch not found" });
        return;
      }

      let subtotal = 0;
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
        subtotal += item.cantidad * item.valorUnitario;
      }

      const impuestos = body.impuestos ?? 0;
      const total = subtotal + impuestos;

      const purchase = await Purchase.create(
        {
          supplierId: body.supplierId,
          branchId: body.branchId,
          fecha: new Date(),
          subtotal,
          impuestos,
          total,
          estado: "pending",
        },
        { transaction: t }
      );

      await PurchaseDetail.bulkCreate(
        body.items.map((item) => ({
          purchaseId: purchase.id,
          productId: item.productId,
          cantidad: item.cantidad,
          valorUnitario: item.valorUnitario,
          total: item.cantidad * item.valorUnitario,
          receivedQuantity: 0,
          observaciones: item.observaciones ?? null,
        })),
        { transaction: t }
      );

      await t.commit();

      const created = await Purchase.findByPk(purchase.id, {
        include: [{ model: PurchaseDetail, as: "items" }],
      });
      res.status(201).json({ purchase: created });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error creating purchase", detail: String(error) });
    }
  }

  // ================== RECEIVE ==================
  /** Recepción parcial o total de una compra. Actualiza Inventory de la sucursal. */
  public async receive(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const id = paramId(req);
      const body = req.body as ReceiveBody;

      const purchase = await Purchase.findByPk(id, {
        include: [{ model: PurchaseDetail, as: "items" }],
        transaction: t,
      });

      if (!purchase) {
        await t.rollback();
        res.status(404).json({ error: "Purchase not found" });
        return;
      }

      if (purchase.estado === "cancelled" || purchase.estado === "received") {
        await t.rollback();
        res.status(400).json({ error: `No se puede recibir una compra en estado '${purchase.estado}'` });
        return;
      }

      const items = (purchase as any).items as PurchaseDetail[];

      for (const receipt of body.items) {
        const detail = items.find((i) => i.productId === receipt.productId);
        if (!detail) {
          await t.rollback();
          res.status(400).json({ error: `El producto '${receipt.productId}' no pertenece a esta compra` });
          return;
        }
        if (receipt.cantidad <= 0) {
          await t.rollback();
          res.status(400).json({ error: "La cantidad a recibir debe ser mayor a 0" });
          return;
        }
        if (detail.receivedQuantity + receipt.cantidad > detail.cantidad) {
          await t.rollback();
          res.status(400).json({
            error: `La cantidad recibida no puede superar lo solicitado para el producto '${receipt.productId}'`,
          });
          return;
        }

        await detail.update(
          { receivedQuantity: detail.receivedQuantity + receipt.cantidad },
          { transaction: t }
        );

        const existingInventory = await Inventory.findOne({
          where: { branchId: purchase.branchId, productId: receipt.productId },
          transaction: t,
        });

        if (existingInventory) {
          await existingInventory.update(
            { quantity: existingInventory.quantity + receipt.cantidad },
            { transaction: t }
          );
        } else {
          await Inventory.create(
            {
              branchId: purchase.branchId,
              productId: receipt.productId,
              quantity: receipt.cantidad,
              minStock: 0,
            },
            { transaction: t }
          );
        }
      }

      const refreshedItems = await PurchaseDetail.findAll({
        where: { purchaseId: purchase.id },
        transaction: t,
      });

      const allReceived = refreshedItems.every((i) => i.receivedQuantity >= i.cantidad);
      const anyReceived = refreshedItems.some((i) => i.receivedQuantity > 0);

      const nuevoEstado = allReceived ? "received" : anyReceived ? "partial" : "pending";
      await purchase.update({ estado: nuevoEstado }, { transaction: t });

      await t.commit();

      const updated = await Purchase.findByPk(id, {
        include: [{ model: PurchaseDetail, as: "items" }],
      });
      res.status(200).json({ purchase: updated });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error receiving purchase", detail: String(error) });
    }
  }

  // ================== CANCEL ==================
  public async cancel(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id);
      if (!purchase) {
        res.status(404).json({ error: "Purchase not found" });
        return;
      }

      if (purchase.estado === "received") {
        res.status(400).json({ error: "No se puede cancelar una compra ya recibida" });
        return;
      }

      await purchase.update({ estado: "cancelled" });
      res.status(200).json({ purchase });
    } catch (error) {
      res.status(500).json({ error: "Error cancelling purchase", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física: borra detalle y cabecera en transacción */
  public async deletePhysical(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id, { transaction: t });
      if (!purchase) {
        await t.rollback();
        res.status(404).json({ error: "Purchase not found" });
        return;
      }

      await PurchaseDetail.destroy({ where: { purchaseId: id }, transaction: t });
      await purchase.destroy({ transaction: t });

      await t.commit();
      res.status(200).json({ message: "Purchase permanently deleted", id });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: "Error deleting purchase", detail: String(error) });
    }
  }
}
