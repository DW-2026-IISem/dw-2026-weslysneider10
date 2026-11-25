import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class PaymentExceedsBalanceException extends DomainException {
    constructor(saleId: number, balance: number);
}
