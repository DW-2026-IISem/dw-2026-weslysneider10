import { PaymentModel } from '../models/payment.model';
import { PaymentMethod } from '../../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../../domain/enums/payment-reference-type.enum';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';
import { SaleModel } from '../../../../sales/infrastructure/persistence/models/sale.model';

export async function seedPayments(): Promise<void> {
  const count = await PaymentModel.count();
  if (count > 0) {
    return;
  }

  const sale = await SaleModel.findOne({ order: [['id', 'ASC']] });
  if (!sale) {
    return;
  }

  await PaymentModel.create({
    referenceType: PaymentReferenceType.SALE,
    referenceId: sale.id,
    method: PaymentMethod.CASH,
    amount: sale.total,
    paymentDate: new Date(),
    status: PaymentStatus.CONFIRMED,
  });
}
