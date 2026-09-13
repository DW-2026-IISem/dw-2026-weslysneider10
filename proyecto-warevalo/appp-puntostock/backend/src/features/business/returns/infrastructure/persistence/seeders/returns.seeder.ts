import { ReturnModel } from '../models/return.model';
import { ReturnDetailModel } from '../models/return-detail.model';
import { SaleModel } from '../../../../sales/infrastructure/persistence/models/sale.model';
import { ProductSaleModel } from '../../../../sales/infrastructure/persistence/models/product-sale.model';
import { ProductModel } from '../../../../products/infrastructure/persistence/models/product.model';

export async function seedReturns(): Promise<void> {
  const count = await ReturnModel.count();
  if (count > 0) {
    return;
  }

  const sale = await SaleModel.findOne({ include: [ProductSaleModel] });

  if (!sale) {
    return;
  }

  const saleItem = (sale.items as ProductSaleModel[])?.[0];

  if (!saleItem) {
    return;
  }

  const quantity = 1;
  const unitPrice = Number(saleItem.unitPrice);
  const subtotal = quantity * unitPrice;

  const sequelize = ReturnModel.sequelize!;

  await sequelize.transaction(async (transaction) => {
    const returnHeader = await ReturnModel.create(
      {
        returnDate: new Date(),
        reason: 'Producto en mal estado',
        saleId: sale.id,
        subtotal,
        total: subtotal,
      },
      { transaction },
    );

    await ReturnDetailModel.create(
      {
        returnId: returnHeader.id,
        productId: saleItem.productId,
        quantity,
        unitPrice,
        total: subtotal,
      },
      { transaction },
    );

    const product = await ProductModel.findByPk(saleItem.productId, { transaction });
    if (product) {
      await product.update(
        { quantity: product.quantity + quantity },
        { transaction },
      );
    }
  });
}
