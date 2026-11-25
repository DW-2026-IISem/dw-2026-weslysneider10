import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InvalidProductPriceException extends DomainException {
    constructor(price: number);
}
