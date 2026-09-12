import { ProductModel } from '../models/product.model';

export async function seedProducts(): Promise<void> {
  const count = await ProductModel.count();

  if (count > 0) {
    return;
  }

  await ProductModel.bulkCreate([
    {
      sku: 'SKU-001',
      name: 'Arroz Diana 500g',
      description: 'Arroz blanco de 500 gramos',
      price: 4500,
      quantity: 100,
      isActive: true,
    },
    {
      sku: 'SKU-002',
      name: 'Aceite vegetal 1L',
      description: 'Aceite vegetal de cocina',
      price: 8500,
      quantity: 50,
      isActive: true,
    },
    {
      sku: 'SKU-003',
      name: 'Azúcar 1kg',
      description: 'Azúcar blanca de un kilogramo',
      price: 4200,
      quantity: 80,
      isActive: true,
    },
  ]);
}
