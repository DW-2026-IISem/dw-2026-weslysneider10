"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuppliers = seedSuppliers;
const supplier_model_1 = require("../models/supplier.model");
const status_enum_1 = require("../../../../../../common/enums/status.enum");
async function seedSuppliers() {
    const count = await supplier_model_1.SupplierModel.count();
    if (count > 0) {
        return;
    }
    await supplier_model_1.SupplierModel.bulkCreate([
        {
            nit: '900123456',
            businessName: 'Distribuidora La Guajira SAS',
            contactName: 'Carlos Ramírez',
            phone: '+57 300 1112233',
            email: 'ventas@distribuidoralaguajira.com',
            status: status_enum_1.Status.ACTIVE,
        },
        {
            nit: '900654321',
            businessName: 'Comercializadora del Caribe SAS',
            contactName: 'Ana Mendoza',
            phone: '+57 310 4445566',
            email: 'contacto@comercializadoracaribe.com',
            status: status_enum_1.Status.ACTIVE,
        },
    ]);
}
//# sourceMappingURL=suppliers.seeder.js.map