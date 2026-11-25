import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class ProductNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
