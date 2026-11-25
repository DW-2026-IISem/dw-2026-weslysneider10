"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedClients = seedClients;
const client_model_1 = require("../models/client.model");
const bcrypt_password_hasher_service_1 = require("../../../../../../infrastructure/security/hashing/bcrypt-password-hasher.service");
const status_enum_1 = require("../../../../../../common/enums/status.enum");
async function seedClients() {
    const count = await client_model_1.ClientModel.count();
    if (count > 0) {
        return;
    }
    const hasher = new bcrypt_password_hasher_service_1.BcryptPasswordHasherService();
    await client_model_1.ClientModel.bulkCreate([
        {
            name: 'Juan Pérez',
            address: 'Calle Principal 123',
            phone: '+57 300 1234567',
            email: 'juan.perez@example.com',
            password: await hasher.hash('password123'),
            status: status_enum_1.Status.ACTIVE,
        },
        {
            name: 'María García',
            address: 'Av. Central 456',
            phone: '+57 310 9876543',
            email: 'maria.garcia@example.com',
            password: await hasher.hash('password123'),
            status: status_enum_1.Status.ACTIVE,
        },
    ]);
}
//# sourceMappingURL=clients.seeder.js.map