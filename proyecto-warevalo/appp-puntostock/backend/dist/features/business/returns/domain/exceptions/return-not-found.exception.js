"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class ReturnNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Devolución', id);
    }
}
exports.ReturnNotFoundException = ReturnNotFoundException;
//# sourceMappingURL=return-not-found.exception.js.map