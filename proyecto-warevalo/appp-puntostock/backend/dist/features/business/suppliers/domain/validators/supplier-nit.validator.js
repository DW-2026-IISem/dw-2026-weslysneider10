"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNit = isValidNit;
function isValidNit(nit) {
    const nitRegex = /^\d{5,15}(-\d)?$/;
    return nitRegex.test(nit);
}
//# sourceMappingURL=supplier-nit.validator.js.map