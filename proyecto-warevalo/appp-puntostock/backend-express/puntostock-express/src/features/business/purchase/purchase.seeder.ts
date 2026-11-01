import { faker } from "@faker-js/faker";
import { Purchase } from "./purchase.model";
import { PurchaseDetail } from "./purchase-detail.model";
import { Supplier } from "../supplier/supplier.model";
import { Product } from "../product/product.model";
import { Branch } from "../branch/branch.model";

/**
 * Seeder de compras.
 * Requiere proveedores, productos y sucursales previamente sembrados.
 */
export async function seedPurchases(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️ purchases: count=0, se omite");
    return 0;
  }

  const existing = await Purchase.count();

  if (existing > 0) {
    console.log(
      `⏭️ purchases: ya hay ${existing} registro(s), se omite seeder`
    );
    return 0;
  }

  const suppliers = await Supplier.findAll({
    where: { isActive: true },
  });

  const products = await Product.findAll({
    where: { status: "active" },
  });

  const branches = await Branch.findAll({
    where: { status: "active" },
  });

  if (
    suppliers.length === 0 ||
    products.length === 0 ||
    branches.length === 0
  ) {
    console.log(
      "⏭️ purchases: no hay proveedores, productos o sucursales activas"
    );
    return 0;
  }

  let inserted = 0;

  for (let i = 0; i < count; i++) {
    const supplier = faker.helpers.arrayElement(suppliers);
    const branch = faker.helpers.arrayElement(branches);

    const selectedProducts = faker.helpers.arrayElements(
      products,
      Math.min(3, products.length)
    );

    let subtotal = 0;

    const details = selectedProducts.map((product) => {
      const cantidad = faker.number.int({ min: 1, max: 20 });
      const valorUnitario = faker.number.int({
        min: 5000,
        max: 100000,
      });

      const total = cantidad * valorUnitario;
      subtotal += total;

      return {
        productId: product.id,
        cantidad,
        valorUnitario,
        total,
        receivedQuantity: 0,
        observaciones: faker.commerce.productDescription(),
      };
    });

    const impuestos = Math.round(subtotal * 0.19);
    const total = subtotal + impuestos;

    const purchase = await Purchase.create({
      supplierId: supplier.id,
      branchId: branch.id,
      fecha: faker.date.recent({ days: 30 }),
      subtotal,
      impuestos,
      total,
      estado: "pending",
    });

    await PurchaseDetail.bulkCreate(
      details.map((detail) => ({
        purchaseId: purchase.id,
        ...detail,
      }))
    );

    inserted++;
  }

  console.log(`✅ purchases: insertadas ${inserted} compras de prueba`);
  return inserted;
}
