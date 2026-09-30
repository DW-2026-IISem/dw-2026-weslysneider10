import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import {
  Purchase,
  PurchaseDetail,
} from "./purchase.model";
import { Supplier } from "../supplier/supplier.model";
import { Product } from "../product/product.model";
import { Inventory } from "../inventory/inventory.model";

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
        res.status(404).json({ error: "Purchase not found" });
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

  public async create(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const body = req.body;

      const supplier = await Supplier.findByPk(body.supplierId);

      if (!supplier) {
        await transaction.rollback();
        res.status(404).json({ error: "Supplier not found" });
        return;
      }

      if (!body.details || body.details.length === 0) {
        await transaction.rollback();
        res.status(400).json({
          error: "At least one purchase detail is required",
        });
        return;
      }

      let subtotal = 0;

      for (const detail of body.details) {
        const product = await Product.findByPk(detail.productId);

        if (!product) {
          await transaction.rollback();
          res.status(404).json({
            error: `Product ${detail.productId} not found`,
          });
          return;
        }

        subtotal += detail.quantity * detail.unitPrice;
      }

      const taxes = body.taxes ?? 0;
      const total = subtotal + taxes;

      const purchase = await Purchase.create(
        {
          supplierId: body.supplierId,
          date: body.date ?? new Date(),
          subtotal,
          taxes,
          total,
          status: body.status ?? "pending",
        },
        { transaction }
      );

      for (const detail of body.details) {
        await PurchaseDetail.create(
          {
            purchaseId: purchase.id,
            productId: detail.productId,
            quantity: detail.quantity,
            unitPrice: detail.unitPrice,
            total: detail.quantity * detail.unitPrice,
            observations: detail.observations ?? null,
          },
          { transaction }
        );
      }

      await transaction.commit();

      res.status(201).json({ purchase });
    } catch (error) {
      await transaction.rollback();

      res.status(500).json({
        error: "Error creating purchase",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        res.status(404).json({ error: "Purchase not found" });
        return;
      }

      await purchase.update(req.body);

      res.status(200).json({ purchase });
    } catch (error) {
      res.status(500).json({
        error: "Error updating purchase (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        res.status(404).json({ error: "Purchase not found" });
        return;
      }

      await purchase.update(req.body);

      res.status(200).json({ purchase });
    } catch (error) {
      res.status(500).json({
        error: "Error updating purchase (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DETAILS ==================

  public async getDetails(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        res.status(404).json({
          error: "Purchase not found",
        });
        return;
      }

      const details = await PurchaseDetail.findAll({
        where: {
          purchaseId: id,
        },
      });

      res.status(200).json({
        purchase,
        details,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching purchase details",
        detail: String(error),
      });
    }
  }

  // ================== RECEIVE ==================

  public async receive(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const id = paramId(req);
      const { branchId, received } = req.body;

      if (!branchId) {
        await transaction.rollback();

        res.status(400).json({
          error: "branchId is required",
        });
        return;
      }

      if (!received || !Array.isArray(received)) {
        await transaction.rollback();

        res.status(400).json({
          error: "received must be an array",
        });
        return;
      }

      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        await transaction.rollback();

        res.status(404).json({
          error: "Purchase not found",
        });
        return;
      }

      for (const item of received) {
        const detail = await PurchaseDetail.findOne({
          where: {
            id: item.detailId,
            purchaseId: id,
          },
        });

        if (!detail) {
          await transaction.rollback();

          res.status(404).json({
            error: `Purchase detail ${item.detailId} not found`,
          });
          return;
        }

        if (item.quantity <= 0) {
          await transaction.rollback();

          res.status(400).json({
            error: "Received quantity must be greater than zero",
          });
          return;
        }

        const inventory = await Inventory.findOne({
          where: {
            branchId,
            productId: detail.productId,
          },
        });

        if (!inventory) {
          await transaction.rollback();

          res.status(404).json({
            error: `Inventory not found for branch ${branchId} and product ${detail.productId}`,
          });
          return;
        }

        await inventory.increment(
          "quantity",
          {
            by: item.quantity,
            transaction,
          }
        );
      }

      await purchase.update(
        {
          status: "received",
        },
        {
          transaction,
        }
      );

      await transaction.commit();

      res.status(200).json({
        message: "Purchase received successfully",
        purchase,
      });
    } catch (error) {
      await transaction.rollback();

      res.status(500).json({
        error: "Error receiving purchase",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================

  public async deletePhysical(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        await transaction.rollback();

        res.status(404).json({
          error: "Purchase not found",
        });
        return;
      }

      await PurchaseDetail.destroy({
        where: {
          purchaseId: id,
        },
        transaction,
      });

      await purchase.destroy({
        transaction,
      });

      await transaction.commit();

      res.status(200).json({
        message: "Purchase permanently deleted",
        id,
      });
    } catch (error) {
      await transaction.rollback();

      res.status(500).json({
        error: "Error deleting purchase",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        res.status(404).json({
          error: "Purchase not found",
        });
        return;
      }

      await purchase.update({
        status: "cancelled",
      });

      res.status(200).json({
        message: "Purchase cancelled (logical delete)",
        purchase,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error cancelling purchase",
        detail: String(error),
      });
    }
  }
}
