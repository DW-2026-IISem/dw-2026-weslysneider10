import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InventoryAlreadyExistsException extends DomainException {
  constructor(branchId: number, productId: number) {
    super(
      `Ya existe un registro de inventario para la sucursal '${branchId}' y el producto '${productId}'`,
    );
  }
}
