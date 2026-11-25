import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class SupplierNitAlreadyExistsException extends DomainException {
    constructor(nit: string);
}
