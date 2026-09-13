import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class InvalidReturnQuantityException extends DomainException {
  constructor(
    productName: string,
    sold: number,
    alreadyReturned: number,
    requested: number,
  ) {
    super(
      `No se puede devolver ${requested} unidad(es) de '${productName}': vendidas ${sold}, ya devueltas ${alreadyReturned}`,
    );
  }
}
