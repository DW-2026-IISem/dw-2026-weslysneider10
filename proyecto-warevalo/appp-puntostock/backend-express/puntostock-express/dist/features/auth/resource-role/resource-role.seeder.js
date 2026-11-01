"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedResourceRoles = seedResourceRoles;
const resource_model_1 = require("../resource/resource.model");
const role_model_1 = require("../role/role.model");
const resource_catalog_1 = require("../resource/resource-catalog");
const resource_role_service_1 = require("./resource-role.service");
/**
 * Seeder de las concesiones rol <-> recurso (resource_roles).
 * Es el que construye la matriz de permisos.
 *
 * - ADMIN -> todos los recursos del catálogo (administración total).
 * - SELLER -> los recursos marcados seller: true (operación de ventas).
 *
 * reconcileRole es determinista: reejecutar el seeder reconcilia el
 * catálogo sin acumular permisos por accidente.
 */
async function seedResourceRoles() {
    const service = new resource_role_service_1.ResourceRoleService();
    const resources = await resource_model_1.Resource.findAll({ where: { status: "active" } });
    const idByOperation = new Map(resources.map((resource) => [`${resource.method} ${resource.path}`, resource.id]));
    /** Traduce el catálogo en código a los resource_id reales de la base. */
    const idsFor = (catalog) => catalog
        .map((item) => idByOperation.get(`${item.method} ${item.path}`))
        .filter((id) => typeof id === "number");
    let total = 0;
    const admin = await role_model_1.Role.findOne({ where: { name: "ADMIN" } });
    if (admin) {
        const result = await service.reconcileRole(admin.id, idsFor(resource_catalog_1.RESOURCE_CATALOG));
        console.log(`✅ resource_roles: ADMIN -> ${result.total_active} recursos ` +
            `(${result.activated} altas, ${result.deactivated} bajas)`);
        total += result.total_active;
    }
    const seller = await role_model_1.Role.findOne({ where: { name: "SELLER" } });
    if (seller) {
        const result = await service.reconcileRole(seller.id, idsFor(resource_catalog_1.SELLER_RESOURCES));
        console.log(`✅ resource_roles: SELLER -> ${result.total_active} recursos ` +
            `(${result.activated} altas, ${result.deactivated} bajas)`);
        total += result.total_active;
    }
    return total;
}
//# sourceMappingURL=resource-role.seeder.js.map