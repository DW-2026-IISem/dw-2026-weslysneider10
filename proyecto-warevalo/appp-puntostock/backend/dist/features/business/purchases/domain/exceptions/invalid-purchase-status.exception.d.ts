import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InvalidPurchaseStatusException extends DomainException {
    constructor(currentStatus: string, action: string);
}
