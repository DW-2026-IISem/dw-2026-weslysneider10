import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class PaymentExceedsBalanceException extends DomainException {
  constructor(saleId: number, balance: number) {
    super(
      `El monto del pago supera el saldo pendiente (${balance}) de la venta ${saleId}`,
    );
  }
}
