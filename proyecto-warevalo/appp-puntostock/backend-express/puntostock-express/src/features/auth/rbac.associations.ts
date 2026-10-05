import { User } from "./user/user.model";
import { Role } from "./role/role.model";
import { Resource } from "./resource/resource.model";
import { RoleUser } from "./role-user/role-user.model";
import { ResourceRole } from "./resource-role/resource-role.model";
import { RefreshToken } from "./refresh-token/refresh-token.model";

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
ResourceRole.belongsTo(Role, { foreignKey: "role_id", as: "role" });
ResourceRole.belongsTo(Resource, { foreignKey: "resource_id", as: "resource" });
Role.hasMany(ResourceRole, { foreignKey: "role_id", as: "resource_roles" });
Resource.hasMany(ResourceRole, { foreignKey: "resource_id", as: "resource_roles" });

// --- La asignación conoce su usuario y su rol (primer eslabón de la cadena) ---
RoleUser.belongsTo(User, { foreignKey: "user_id", as: "user" });
RoleUser.belongsTo(Role, { foreignKey: "role_id", as: "role" });
User.hasMany(RoleUser, { foreignKey: "user_id", as: "role_users" });
Role.hasMany(RoleUser, { foreignKey: "role_id", as: "role_users" });

// --- Las sesiones pertenecen a un usuario ---
RefreshToken.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(RefreshToken, { foreignKey: "user_id", as: "refresh_tokens" });
