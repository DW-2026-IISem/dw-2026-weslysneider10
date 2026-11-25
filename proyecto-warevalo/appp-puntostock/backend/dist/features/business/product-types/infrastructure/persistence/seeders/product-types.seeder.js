"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProductTypes = seedProductTypes;
const status_enum_1 = require("../../../../../../common/enums/status.enum");
const product_type_model_1 = require("../models/product-type.model");
async function seedProductTypes() {
    const count = await product_type_model_1.ProductTypeModel.count();
    if (count > 0) {
        return;
    }
    await product_type_model_1.ProductTypeModel.bulkCreate([
        {
            name: 'Electrónica',
            description: 'Dispositivos electrónicos y accesorios',
            status: status_enum_1.Status.ACTIVE,
        },
        {
            name: 'Ropa',
            description: 'Prendas de vestir y accesorios',
            status: status_enum_1.Status.ACTIVE,
        },
        {
            name: 'Hogar',
            description: 'Productos para el hogar',
            status: status_enum_1.Status.ACTIVE,
        },
    ]);
}
//# sourceMappingURL=product-types.seeder.js.map