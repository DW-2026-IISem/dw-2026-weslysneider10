import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InsufficientStockException extends DomainException {
    constructor(productName: string, available: number, requested: number);
}
