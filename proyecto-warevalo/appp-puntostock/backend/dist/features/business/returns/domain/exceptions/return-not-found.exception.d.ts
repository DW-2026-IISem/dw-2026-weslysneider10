import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class ReturnNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
