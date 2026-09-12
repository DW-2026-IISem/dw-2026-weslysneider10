import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class ProductTypeNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Tipo de producto', id);
  }
}
