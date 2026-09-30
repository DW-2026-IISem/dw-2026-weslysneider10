import { faker } from "@faker-js/faker";
import {
  Purchase,
  PurchaseDetail,
} from "./purchase.model";
import { Supplier } from "../supplier/supplier.model";
import { Product } from "../product/product.model";

/**
 * Seeder del feature Purchase.
 * Requiere Suppliers y Products previamente sembrados.
 * Idempotente.
 */
export async function seedPurchases(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  purchases: count=0, se omite");
    return 0;
  }

  const existing = await Purchase.count();

  if (existing > 0) {
    console.log(
      `⏭️  purchases: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const suppliers = await Supplier.findAll({
    where: {
      isActive: true,
    },
  });

  const products = await Product.findAll({
    where: {
      status: "active",
    },
  });

  if (suppliers.length === 0 || products.length === 0) {
    console.log(
      "⏭️  purchases: no hay proveedores o productos, se omite seeder"
    );
    return 0;
  }

  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const supplier =
      suppliers[Math.floor(Math.random() * suppliers.length)];

    const selectedProducts = faker.helpers.arrayElements(
      products,
      Math.min(3, products.length)
    );

    let subtotal = 0;

    const details = selectedProducts.map((product) => {
      const quantity = faker.number.int({
        min: 1,
        max: 20,
      });

      const unitPrice = faker.number.int({
        min: 5000,
        max: 100000,
      });

      const total = quantity * unitPrice;

      subtotal += total;

      return {
        productId: product.id,
        quantity,
        unitPrice,
        total,
        observations: faker.commerce.productDescription(),
      };
    });

    const taxes = Math.round(subtotal * 0.19);
    const total = subtotal + taxes;

    const purchase = await Purchase.create({
      supplierId: supplier.id,
      date: faker.date.recent({
        days: 30,
      }),
      subtotal,
      taxes,
      total,
      status: "pending",
    });

    await PurchaseDetail.bulkCreate(
      details.map((detail) => ({
        purchaseId: purchase.id,
        ...detail,
      }))
    );

    inserted++;
  }

  console.log(
    `✅ purchases: insertadas ${inserted} compra(s) falsos`
  );

  return inserted;
}
