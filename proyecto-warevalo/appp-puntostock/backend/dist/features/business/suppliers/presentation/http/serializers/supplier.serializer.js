"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierSerializer = void 0;
const supplier_mapper_1 = require("../../../application/mappers/supplier.mapper");
class SupplierSerializer {
    static serialize(entity) {
        return supplier_mapper_1.SupplierMapper.toResponse(entity);
    }
}
exports.SupplierSerializer = SupplierSerializer;
//# sourceMappingURL=supplier.serializer.js.map