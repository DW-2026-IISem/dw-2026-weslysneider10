"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class ClientNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Cliente', id);
    }
}
exports.ClientNotFoundException = ClientNotFoundException;
//# sourceMappingURL=client-not-found.exception.js.map