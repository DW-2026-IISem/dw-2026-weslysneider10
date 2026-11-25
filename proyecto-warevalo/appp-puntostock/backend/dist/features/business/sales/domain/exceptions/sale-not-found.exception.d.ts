import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class SaleNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
