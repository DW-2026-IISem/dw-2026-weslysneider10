import { Request, Response } from "express";
import { Product, ProductI } from "./product.model";
import { ProductType } from "../product-type/product-type.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

async function assertActiveProductType(
  productTypeId: number,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const productType = await ProductType.findByPk(productTypeId);
  if (!productType) {
    return { ok: false, status: 404, error: "Product type not found" };
  }
  if (productType.status !== "active") {
    return { ok: false, status: 400, error: "Product type must be active" };
  }
  return { ok: true };
}

export class ProductController {
  // ================== READ ==================
  public async getAll(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: { status: "active" },
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Error fetching products", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error fetching product", detail: String(error) });
    }
  }

  // ================== CREATE ==================
  public async create(req: Request, res: Response) {
    try {
      const body = req.body as ProductI;

      const check = await assertActiveProductType(Number(body.productTypeId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      const product = await Product.create({
        sku: body.sku,
        name: body.name,
        description: body.description ?? null,
        price: body.price,
        productTypeId: body.productTypeId,
        status: body.status ?? "active",
      });
      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error creating product", detail: String(error) });
    }
  }

  // ================== UPDATE ==================
  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as ProductI;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const check = await assertActiveProductType(Number(body.productTypeId));
      if (!check.ok) {
        res.status(check.status).json({ error: check.error });
        return;
      }

      await product.update({
        sku: body.sku,
        name: body.name,
        description: body.description ?? null,
        price: body.price,
        productTypeId: body.productTypeId,
        status: body.status ?? product.status,
      });
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error updating product (PUT)", detail: String(error) });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<ProductI>;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      if (body.productTypeId !== undefined) {
        const check = await assertActiveProductType(Number(body.productTypeId));
        if (!check.ok) {
          res.status(check.status).json({ error: check.error });
          return;
        }
      }

      await product.update(body);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error updating product (PATCH)", detail: String(error) });
    }
  }

  // ================== DELETE ==================
  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      await product.destroy();
      res.status(200).json({ message: "Product permanently deleted", id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product", detail: String(error) });
    }
  }

  /** Eliminación lógica → status = inactive */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      await product.update({ status: "inactive" });
      res.status(200).json({
        message: "Product deactivated (logical delete)",
        product,
      });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating product", detail: String(error) });
    }
  }
}
