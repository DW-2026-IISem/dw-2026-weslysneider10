import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class SupplierNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
