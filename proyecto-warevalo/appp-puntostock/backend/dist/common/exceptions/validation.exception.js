"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const application_exception_js_1 = require("./application.exception.js");
class ValidationException extends application_exception_js_1.ApplicationException {
    constructor(message = 'Error de validación') {
        super(message, 422);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map