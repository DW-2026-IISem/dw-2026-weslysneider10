import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InvalidReceiptQuantityException extends DomainException {
  constructor(productName: string, ordered: number, received: number) {
    super(
      `La cantidad recibida (${received}) para '${productName}' no puede superar la cantidad pedida (${ordered})`,
    );
  }
}
