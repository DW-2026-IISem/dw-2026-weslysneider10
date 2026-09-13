import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class ReturnNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Devolución', id);
  }
}
