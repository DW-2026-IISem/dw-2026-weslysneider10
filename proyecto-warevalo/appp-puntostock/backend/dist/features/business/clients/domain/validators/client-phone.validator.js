"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPhone = isValidPhone;
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;
    return phoneRegex.test(phone);
}
//# sourceMappingURL=client-phone.validator.js.map