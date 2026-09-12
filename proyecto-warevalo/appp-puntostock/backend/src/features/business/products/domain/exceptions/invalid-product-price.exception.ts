import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InvalidProductPriceException extends DomainException {
  constructor(price: number) {
    super(`El precio '${price}' debe ser mayor a 0`);
  }
}
