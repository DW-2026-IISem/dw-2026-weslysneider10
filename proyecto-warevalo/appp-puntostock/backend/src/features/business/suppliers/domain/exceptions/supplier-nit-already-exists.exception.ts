import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class SupplierNitAlreadyExistsException extends DomainException {
  constructor(nit: string) {
    super(`El NIT '${nit}' ya está registrado`);
  }
}
