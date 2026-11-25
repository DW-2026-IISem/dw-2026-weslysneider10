import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InvalidReturnQuantityException extends DomainException {
    constructor(productName: string, sold: number, alreadyReturned: number, requested: number);
}
