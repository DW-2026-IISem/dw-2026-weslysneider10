import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class BranchNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Sucursal', id);
  }
}
