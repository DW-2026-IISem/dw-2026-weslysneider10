import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class BranchNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
