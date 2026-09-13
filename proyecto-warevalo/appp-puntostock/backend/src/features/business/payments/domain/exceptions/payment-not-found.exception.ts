import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class PaymentNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Pago', id);
  }
}
