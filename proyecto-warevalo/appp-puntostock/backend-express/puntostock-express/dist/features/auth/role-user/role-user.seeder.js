"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_ROLE_USERS = void 0;
exports.seedRoleUsers = seedRoleUsers;
const role_user_model_1 = require("./role-user.model");
const role_model_1 = require("../role/role.model");
const user_model_1 = require("../user/user.model");
/**
 * Seeder de las asignaciones usuario <-> rol (role_users).
 *
 * Con esto el usuario admin hereda los recursos de ADMIN y el usuario
 * seller los de SELLER, sin escribir ni una fila de autorización a mano.
 */
exports.SEED_ROLE_USERS = [
    { username: "admin", roleName: "ADMIN" },
    { username: "seller", roleName: "SELLER" },
];
async function seedRoleUsers() {
    let created = 0;
    for (const item of exports.SEED_ROLE_USERS) {
        const user = await user_model_1.User.findOne({ where: { username: item.username } });
        const role = await role_model_1.Role.findOne({ where: { name: item.roleName } });
        if (!user || !role) {
            console.log(`⏭️  role_users: falta ${item.username} o ${item.roleName}, se omite esa asignación`);
            continue;
        }
        const [assignment, wasCreated] = await role_user_model_1.RoleUser.findOrCreate({
            where: { user_id: user.id, role_id: role.id },
            defaults: { user_id: user.id, role_id: role.id, status: "active" },
        });
        if (wasCreated) {
            created++;
            continue;
        }
        if (assignment.status !== "active") {
            await assignment.update({ status: "active" });
        }
    }
    console.log(`✅ role_users: asignaciones reconciliadas (${exports.SEED_ROLE_USERS.length}, ${created} nuevas)`);
    return created;
}
//# sourceMappingURL=role-user.seeder.js.map