"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllSeeders = runAllSeeders;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db");
// ============================================================
// MODELOS BUSINESS
// ============================================================
require("../../features/business/client/client.model");
require("../../features/business/product-type/product-type.model");
require("../../features/business/product/product.model");
require("../../features/business/product/product.associations");
require("../../features/business/branch/branch.model");
require("../../features/business/supplier/supplier.model");
require("../../features/business/inventory/inventory.model");
require("../../features/business/payment/payment.model");
require("../../features/business/purchase/purchase.model");
require("../../features/business/purchase/purchase.associations");
require("../../features/business/sale/sale.model");
require("../../features/business/sale/sale-detail.model");
require("../../features/business/sale/sale.associations");
require("../../features/business/return/return.model");
// ============================================================
// MODELOS AUTH / RBAC
// ============================================================
require("../../features/auth/user/user.model");
require("../../features/auth/role/role.model");
require("../../features/auth/resource/resource.model");
require("../../features/auth/role-user/role-user.model");
require("../../features/auth/resource-role/resource-role.model");
require("../../features/auth/refresh-token/refresh-token.model");
require("../../features/auth/rbac.associations");
// ============================================================
// SEEDERS BUSINESS
// ============================================================
const client_seeder_1 = require("../../features/business/client/client.seeder");
const product_type_seeder_1 = require("../../features/business/product-type/product-type.seeder");
const product_seeder_1 = require("../../features/business/product/product.seeder");
const branch_seeder_1 = require("../../features/business/branch/branch.seeder");
const supplier_seeder_1 = require("../../features/business/supplier/supplier.seeder");
const inventory_seeder_1 = require("../../features/business/inventory/inventory.seeder");
const purchase_seeder_1 = require("../../features/business/purchase/purchase.seeder");
const sale_seeder_1 = require("../../features/business/sale/sale.seeder");
const payment_seeder_1 = require("../../features/business/payment/payment.seeder");
const return_seeder_1 = require("../../features/business/return/return.seeder");
// ============================================================
// SEEDERS AUTH / RBAC
// ============================================================
const role_seeder_1 = require("../../features/auth/role/role.seeder");
const resource_seeder_1 = require("../../features/auth/resource/resource.seeder");
const user_seeder_1 = require("../../features/auth/user/user.seeder");
const role_user_seeder_1 = require("../../features/auth/role-user/role-user.seeder");
const resource_role_seeder_1 = require("../../features/auth/resource-role/resource-role.seeder");
const counts_1 = require("./counts");
dotenv_1.default.config();
/**
 * Ejecuta todos los seeders del proyecto.
 *
 * Orden:
 *
 * 1. Roles
 * 2. Resources
 * 3. Users
 * 4. RoleUsers
 * 5. ResourceRoles
 * 6. Datos Business respetando FK
 */
async function runAllSeeders() {
    const counts = (0, counts_1.resolveSeedCounts)();
    console.log("🌱 Iniciando SeedersRunner...");
    console.log("📊 Conteos:", counts);
    const ok = await (0, db_1.testConnection)();
    if (!ok) {
        throw new Error("No hay conexión a la base de datos");
    }
    await db_1.sequelize.sync({
        force: false,
    });
    // ==========================================================
    // AUTH / RBAC
    // ==========================================================
    console.log("🔐 Sembrando seguridad RBAC...");
    await (0, role_seeder_1.seedRoles)();
    await (0, resource_seeder_1.seedResources)();
    await (0, user_seeder_1.seedUsers)(counts.users);
    await (0, role_user_seeder_1.seedRoleUsers)();
    await (0, resource_role_seeder_1.seedResourceRoles)();
    console.log("✅ Seguridad RBAC inicializada");
    // ==========================================================
    // BUSINESS
    // ==========================================================
    console.log("🏪 Sembrando datos de negocio...");
    await (0, client_seeder_1.seedClients)(counts.clients);
    await (0, product_type_seeder_1.seedProductTypes)(counts.product_types);
    await (0, product_seeder_1.seedProducts)(counts.products);
    await (0, branch_seeder_1.seedBranches)(counts.branches);
    await (0, supplier_seeder_1.seedSuppliers)(counts.suppliers);
    await (0, inventory_seeder_1.seedInventories)(counts.inventories);
    // Purchase depende de Supplier + Product
    await (0, purchase_seeder_1.seedPurchases)(counts.purchases);
    // Sale depende de Client + Branch + Product
    await (0, sale_seeder_1.seedSales)(counts.sales);
    // Payment depende de Sale
    await (0, payment_seeder_1.seedPayments)(counts.payments);
    // Return depende de SaleDetail
    await (0, return_seeder_1.seedReturns)(counts.returns);
    console.log("🌱 SeedersRunner finalizado correctamente");
}
if (require.main === module) {
    runAllSeeders()
        .then(async () => {
        await db_1.sequelize.close();
        process.exit(0);
    })
        .catch(async (err) => {
        console.error("❌ Error en seeders:", err);
        await db_1.sequelize.close();
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map