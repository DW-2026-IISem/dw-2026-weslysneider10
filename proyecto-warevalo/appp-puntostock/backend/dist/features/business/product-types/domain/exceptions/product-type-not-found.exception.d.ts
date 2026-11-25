import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class ProductTypeNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
