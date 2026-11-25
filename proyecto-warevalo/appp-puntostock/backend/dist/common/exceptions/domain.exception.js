"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
const application_exception_js_1 = require("./application.exception.js");
class DomainException extends application_exception_js_1.ApplicationException {
    constructor(message) {
        super(message, 400);
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map