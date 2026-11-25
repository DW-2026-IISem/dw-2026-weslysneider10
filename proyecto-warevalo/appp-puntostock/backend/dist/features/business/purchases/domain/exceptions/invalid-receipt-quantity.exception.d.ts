import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InvalidReceiptQuantityException extends DomainException {
    constructor(productName: string, ordered: number, received: number);
}
