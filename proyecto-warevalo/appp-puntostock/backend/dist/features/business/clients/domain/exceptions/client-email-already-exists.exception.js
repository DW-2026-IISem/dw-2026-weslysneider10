"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEmailAlreadyExistsException = void 0;
const domain_exception_1 = require("../../../../../common/exceptions/domain.exception");
class ClientEmailAlreadyExistsException extends domain_exception_1.DomainException {
    constructor(email) {
        super(`El email '${email}' ya está registrado`);
    }
}
exports.ClientEmailAlreadyExistsException = ClientEmailAlreadyExistsException;
//# sourceMappingURL=client-email-already-exists.exception.js.map