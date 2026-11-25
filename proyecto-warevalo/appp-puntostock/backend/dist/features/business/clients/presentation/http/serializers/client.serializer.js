"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSerializer = void 0;
const client_mapper_1 = require("../../../application/mappers/client.mapper");
class ClientSerializer {
    static serialize(entity) {
        return client_mapper_1.ClientMapper.toResponse(entity);
    }
}
exports.ClientSerializer = ClientSerializer;
//# sourceMappingURL=client.serializer.js.map