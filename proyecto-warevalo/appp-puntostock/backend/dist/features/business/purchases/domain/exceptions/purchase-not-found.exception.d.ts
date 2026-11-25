import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class PurchaseNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
