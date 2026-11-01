"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_ROLES = void 0;
exports.seedRoles = seedRoles;
const role_model_1 = require("./role.model");
/**
 * Seeder del catálogo de roles (roles).
 *
 * Crea los dos roles de referencia del sistema. Es determinista e
 * idempotente: findOrCreate por nombre y reactivación si ya existía inactivo.
 *
 * Los roles nacen sin permisos: las concesiones las crea el seeder de
 * resource_roles (ADMIN recibe los 58 recursos, SELLER los 7 de operación).
 */
exports.SEED_ROLES = [
    { name: "ADMIN", description: "Administración del sistema: gestiona usuarios, roles y permisos" },
    { name: "SELLER", description: "Operación de ventas: consulta catálogo y registra ventas" },
];
async function seedRoles() {
    let created = 0;
    for (const item of exports.SEED_ROLES) {
        const [role, wasCreated] = await role_model_1.Role.findOrCreate({
            where: { name: item.name },
            defaults: { name: item.name, description: item.description, status: "active" },
        });
        if (wasCreated) {
            created++;
            continue;
        }
        if (role.status !== "active") {
            await role.update({ status: "active" });
        }
    }
    console.log(`✅ roles: catálogo reconciliado (${exports.SEED_ROLES.length} roles, ${created} nuevos)`);
    return created;
}
//# sourceMappingURL=role.seeder.js.map