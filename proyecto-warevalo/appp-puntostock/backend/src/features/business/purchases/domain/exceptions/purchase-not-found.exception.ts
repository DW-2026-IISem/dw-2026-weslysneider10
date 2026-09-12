import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class PurchaseNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Compra', id);
  }
}
