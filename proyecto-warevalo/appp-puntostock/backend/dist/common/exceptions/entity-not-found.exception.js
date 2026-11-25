"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundException = void 0;
const application_exception_js_1 = require("./application.exception.js");
class EntityNotFoundException extends application_exception_js_1.ApplicationException {
    constructor(entityName, identifier) {
        super(`${entityName} con ID ${identifier} no encontrado`, 404);
    }
}
exports.EntityNotFoundException = EntityNotFoundException;
//# sourceMappingURL=entity-not-found.exception.js.map