import { Request, Response } from "express";
import { Payment } from "./payment.model";
import { Sale } from "../sale/sale.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class PaymentController {

  public async getAll(req: Request, res: Response) {
    try {
      const payments = await Payment.findAll();

      res.status(200).json({ payments });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching payments",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const payment = await Payment.findByPk(id);

      if (!payment) {
        res.status(404).json({
          error: "Payment not found",
        });
        return;
      }

      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching payment",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { saleId, fecha, metodo, monto } = req.body;

      const sale = await Sale.findByPk(saleId);

      if (!sale) {
        res.status(404).json({
          error: "Sale not found",
        });
        return;
      }

      if (!metodo || !["cash", "card", "transfer"].includes(metodo)) {
        res.status(400).json({
          error: "Invalid payment method",
        });
        return;
      }

      if (!monto || Number(monto) <= 0) {
        res.status(400).json({
          error: "Payment amount must be greater than zero",
        });
        return;
      }

      const payment = await Payment.create({
        saleId,
        fecha: fecha ?? new Date(),
        metodo,
        monto,
        estado: "completed",
      });

      res.status(201).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error creating payment",
        detail: String(error),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const payment = await Payment.findByPk(id);

      if (!payment) {
        res.status(404).json({
          error: "Payment not found",
        });
        return;
      }

      await payment.update(req.body);

      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({
        error: "Error updating payment",
        detail: String(error),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const payment = await Payment.findByPk(id);

      if (!payment) {
        res.status(404).json({
          error: "Payment not found",
        });
        return;
      }

      await payment.update({
        estado: "cancelled",
      });

      res.status(200).json({
        message: "Payment cancelled",
        payment,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error cancelling payment",
        detail: String(error),
      });
    }
  }
}
