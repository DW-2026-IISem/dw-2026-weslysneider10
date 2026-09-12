import { PurchaseModel } from '../models/purchase.model';
import { PurchaseDetailModel } from '../models/purchase-detail.model';
import { SupplierModel } from '../../../../suppliers/infrastructure/persistence/models/supplier.model';
import { BranchModel } from '../../../../branches/infrastructure/persistence/models/branch.model';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model';
import { PurchaseStatus } from '../../../domain/entities/purchase.entity';

export async function seedPurchases(): Promise<void> {
  const count = await PurchaseModel.count();
  if (count > 0) {
    return;
  }

  const supplier = await SupplierModel.findOne();
  const branch = await BranchModel.findOne();
  const product = await ProductModel.findByPk(1);

  if (!supplier || !branch || !product) {
    return;
  }

  const quantityOrdered = 20;
  const unitCost = Math.round(Number(product.price) * 0.6);
  const subtotal = quantityOrdered * unitCost;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;

  const sequelize = PurchaseModel.sequelize!;

  await sequelize.transaction(async (transaction) => {
    const purchase = await PurchaseModel.create(
      {
        purchaseDate: new Date(),
        supplierId: supplier.id,
        branchId: branch.id,
        status: PurchaseStatus.PENDING,
        subtotal,
        tax,
        total,
      },
      { transaction },
    );

    await PurchaseDetailModel.create(
      {
        purchaseId: purchase.id,
        productId: product.id,
        quantityOrdered,
        quantityReceived: 0,
        unitCost,
        total: subtotal,
      },
      { transaction },
    );
  });
}
