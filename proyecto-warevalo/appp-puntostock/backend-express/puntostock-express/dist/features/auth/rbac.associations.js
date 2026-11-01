"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user/user.model");
const role_model_1 = require("./role/role.model");
const resource_model_1 = require("./resource/resource.model");
const role_user_model_1 = require("./role-user/role-user.model");
const resource_role_model_1 = require("./resource-role/resource-role.model");
const refresh_token_model_1 = require("./refresh-token/refresh-token.model");
/**
 * Asociaciones de las seis entidades de seguridad.
 *
 * Se declaran en un solo archivo porque la autorización es una cadena que
 * atraviesa varias tablas:
 *
 *   ResourceRole ──► Role ──► RoleUser ──► (filtro por user_id)
 *          │
 *          └────────► Resource ──► (method, path)
 */
// --- La concesión conoce su rol y su recurso (los dos extremos del permiso) ---
resource_role_model_1.ResourceRole.belongsTo(role_model_1.Role, { foreignKey: "role_id", as: "role" });
resource_role_model_1.ResourceRole.belongsTo(resource_model_1.Resource, { foreignKey: "resource_id", as: "resource" });
role_model_1.Role.hasMany(resource_role_model_1.ResourceRole, { foreignKey: "role_id", as: "resource_roles" });
resource_model_1.Resource.hasMany(resource_role_model_1.ResourceRole, { foreignKey: "resource_id", as: "resource_roles" });
// --- La asignación conoce su usuario y su rol (primer eslabón de la cadena) ---
role_user_model_1.RoleUser.belongsTo(user_model_1.User, { foreignKey: "user_id", as: "user" });
role_user_model_1.RoleUser.belongsTo(role_model_1.Role, { foreignKey: "role_id", as: "role" });
user_model_1.User.hasMany(role_user_model_1.RoleUser, { foreignKey: "user_id", as: "role_users" });
role_model_1.Role.hasMany(role_user_model_1.RoleUser, { foreignKey: "role_id", as: "role_users" });
// --- Las sesiones pertenecen a un usuario ---
refresh_token_model_1.RefreshToken.belongsTo(user_model_1.User, { foreignKey: "user_id", as: "user" });
user_model_1.User.hasMany(refresh_token_model_1.RefreshToken, { foreignKey: "user_id", as: "refresh_tokens" });
//# sourceMappingURL=rbac.associations.js.map