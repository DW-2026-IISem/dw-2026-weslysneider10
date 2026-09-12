import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InvalidPurchaseStatusException extends DomainException {
  constructor(currentStatus: string, action: string) {
    super(
      `No se puede ${action} una compra en estado '${currentStatus}'`,
    );
  }
}
