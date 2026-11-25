"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchNotFoundException = void 0;
const entity_not_found_exception_1 = require("../../../../../common/exceptions/entity-not-found.exception");
class BranchNotFoundException extends entity_not_found_exception_1.EntityNotFoundException {
    constructor(id) {
        super('Sucursal', id);
    }
}
exports.BranchNotFoundException = BranchNotFoundException;
//# sourceMappingURL=branch-not-found.exception.js.map