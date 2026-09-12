import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class InventoryNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Inventario', id);
  }
}
