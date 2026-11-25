import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';
export declare class PaymentNotFoundException extends EntityNotFoundException {
    constructor(id: number);
}
