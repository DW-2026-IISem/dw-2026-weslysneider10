import { InventoryModel } from '../models/inventory.model';
import { BranchModel } from '../../../../branches/infrastructure/persistence/models/branch.model';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model';

export async function seedInventory(): Promise<void> {
  const count = await InventoryModel.count();
  if (count > 0) {
    return;
  }

  const branches = await BranchModel.findAll({ limit: 2 });
  const products = await ProductModel.findAll({ limit: 2 });

  if (branches.length === 0 || products.length === 0) {
    return;
  }

  const rows: Array<{
    branchId: number;
    productId: number;
    quantity: number;
    minStock: number;
  }> = [];

  for (const branch of branches) {
    for (const product of products) {
      rows.push({
        branchId: branch.id,
        productId: product.id,
        quantity: 20,
        minStock: 5,
      });
    }
  }

  await InventoryModel.bulkCreate(rows);
}
