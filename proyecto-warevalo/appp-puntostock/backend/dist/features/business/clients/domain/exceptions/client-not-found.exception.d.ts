import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class ClientNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
