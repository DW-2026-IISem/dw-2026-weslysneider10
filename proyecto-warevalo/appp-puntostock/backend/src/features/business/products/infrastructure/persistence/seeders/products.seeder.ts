import { ProductModel } from '../models/product.model';

export async function seedProducts(): Promise<void> {
  const count = await ProductModel.count();

  if (count > 0) {
    return;
  }

  await ProductModel.bulkCreate([
    {
      sku: 'PROD-001',
      name: 'Producto de ejemplo 1',
      description: 'Producto inicial para PuntoStock',
      price: 10000,
      isActive: true,
    },
    {
      sku: 'PROD-002',
      name: 'Producto de ejemplo 2',
      description: 'Producto inicial para PuntoStock',
      price: 15000,
      isActive: true,
    },
    {
      sku: 'PROD-003',
      name: 'Producto de ejemplo 3',
      description: 'Producto inicial para PuntoStock',
      price: 20000,
      isActive: true,
    },
  ]);
}
