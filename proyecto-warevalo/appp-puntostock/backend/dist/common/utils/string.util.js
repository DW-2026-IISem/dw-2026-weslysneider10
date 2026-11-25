"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEmail = normalizeEmail;
exports.isBlank = isBlank;
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function isBlank(value) {
    return !value || value.trim().length === 0;
}
//# sourceMappingURL=string.util.js.map