"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const role_model_1 = require("./role.model");
/**
 * Capa Repository del feature Role.
 * Única que habla con Sequelize (el modelo `Role`).
 */
class RoleRepository {
    /** Todos los roles activos. */
    async findAllActive() {
        return role_model_1.Role.findAll({ where: { status: "active" } });
    }
    /** Un rol por PK (o `null`). */
    async findById(id, transaction) {
        return role_model_1.Role.findByPk(id, { transaction });
    }
    /** Un rol por nombre normalizado a MAYÚSCULAS (o `null`). */
    async findByName(name) {
        return role_model_1.Role.findOne({ where: { name: name.trim().toUpperCase() } });
    }
    /** Inserta un rol. */
    async create(data) {
        return role_model_1.Role.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(role, data) {
        return role.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(role) {
        await role.destroy();
    }
}
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=role.repository.js.map