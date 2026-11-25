import { DomainException } from '../../../../../common/exceptions/domain.exception';
export declare class ClientEmailAlreadyExistsException extends DomainException {
    constructor(email: string);
}
