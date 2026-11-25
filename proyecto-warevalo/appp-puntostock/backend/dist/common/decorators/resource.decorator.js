"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceMeta = exports.RESOURCE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.RESOURCE_KEY = 'resource';
const ResourceMeta = (path, method) => (0, common_1.SetMetadata)(exports.RESOURCE_KEY, {
    path,
    method,
});
exports.ResourceMeta = ResourceMeta;
//# sourceMappingURL=resource.decorator.js.map