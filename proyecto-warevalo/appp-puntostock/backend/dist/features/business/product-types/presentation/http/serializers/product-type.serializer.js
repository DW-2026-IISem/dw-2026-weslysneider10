"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeSerializer = void 0;
const product_type_mapper_1 = require("../../../application/mappers/product-type.mapper");
class ProductTypeSerializer {
    static serialize(entity) {
        return product_type_mapper_1.ProductTypeMapper.toResponse(entity);
    }
}
exports.ProductTypeSerializer = ProductTypeSerializer;
//# sourceMappingURL=product-type.serializer.js.map