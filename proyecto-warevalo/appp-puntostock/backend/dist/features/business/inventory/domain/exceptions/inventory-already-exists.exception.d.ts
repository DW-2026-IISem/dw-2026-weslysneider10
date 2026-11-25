import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class InventoryAlreadyExistsException extends DomainException {
    constructor(branchId: number, productId: number);
}
