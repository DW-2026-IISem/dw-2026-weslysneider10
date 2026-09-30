import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import {
  Purchase,
  PurchaseDetail,
  PurchaseI,
  PurchaseDetailI,
} from "./purchase.model";
import { Supplier } from "../supplier/supplier.model";
import { Product } from "../product/product.model";

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

  public async create(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const body = req.body as {
        supplierId: number;
        date?: Date;
        taxes?: number;
        status?: string;
        details: Array<{
          productId: number;
          quantity: number;
          unitPrice: number;
          observations?: string | null;
        }>;
      };

      if (!body.supplierId) {
        await transaction.rollback();

        res.status(400).json({
          error: "supplierId is required",
        });
        return;
      }

      if (!body.details || body.details.length === 0) {
        await transaction.rollback();

        res.status(400).json({
          error: "At least one purchase detail is required",
        });
        return;
      }

      const supplier = await Supplier.findByPk(body.supplierId);

      if (!supplier) {
        await transaction.rollback();

        res.status(404).json({
          error: "Supplier not found",
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

        if (detail.quantity <= 0) {
          await transaction.rollback();

          res.status(400).json({
            error: "Quantity must be greater than zero",
          });
          return;
        }

        if (detail.unitPrice < 0) {
          await transaction.rollback();

          res.status(400).json({
            error: "Unit price cannot be negative",
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

      const details = await PurchaseDetail.findAll({
        where: {
          purchaseId: purchase.id,
        },
      });

      res.status(201).json({
        purchase,
        details,
      });
    } catch (error) {
      await transaction.rollback();

      res.status(500).json({
        error: "Error creating purchase",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================
  // (rellenar en el siguiente paso)

  // ================== DETAILS ==================
  // (rellenar más adelante)

  // ================== RECEIVE ==================
  // (rellenar más adelante)

  // ================== DELETE ==================
  // (rellenar en el siguiente paso)
}
