import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class InventoryNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
