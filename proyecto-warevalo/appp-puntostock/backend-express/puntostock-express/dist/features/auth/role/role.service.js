"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const dto_1 = require("./dto");
const role_repository_1 = require("./role.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Role.
 *
 * Regla de negocio: el nombre del rol es único. La autorización nunca se
 * decide por el nombre, sino por las concesiones (resource_roles) asociadas;
 * el nombre solo sirve para agrupar.
 */
class RoleService {
    constructor(repository = new role_repository_1.RoleRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const roles = await this.repository.findAllActive();
        return roles.map((role) => (0, dto_1.toRoleResponse)(role));
    }
    async getOne(id) {
        return (0, dto_1.toRoleResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        if (!body.name) {
            throw new app_error_1.AppError(400, "name is required");
        }
        await this.assertNameAvailable(body.name);
        const role = await this.repository.create({
            name: body.name,
            description: body.description ?? null,
            status: body.status ?? "active",
        });
        return (0, dto_1.toRoleResponse)(role);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const role = await this.findOrFail(id);
        await this.assertNameAvailable(body.name, id);
        await this.repository.update(role, {
            name: body.name,
            description: body.description ?? null,
        });
        return (0, dto_1.toRoleResponse)(role);
    }
    async updatePatch(id, body) {
        const role = await this.findOrFail(id);
        if (body.name) {
            await this.assertNameAvailable(body.name, id);
        }
        await this.repository.update(role, body);
        return (0, dto_1.toRoleResponse)(role);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const role = await this.findOrFail(id, false);
        await this.repository.delete(role);
    }
    /** Eliminación lógica -> status = inactive. Todos sus usuarios pierden ese rol. */
    async deleteLogical(id) {
        const role = await this.findOrFail(id);
        await this.repository.update(role, { status: "inactive" });
        return (0, dto_1.toRoleResponse)(role);
    }
    // ================== HELPERS ==================
    async findOrFail(id, onlyActive = true) {
        const role = await this.repository.findById(id);
        if (!role || (onlyActive && role.status !== "active")) {
            throw new app_error_1.AppError(404, "Role not found");
        }
        return role;
    }
    async assertNameAvailable(name, excludeId) {
        const existing = await this.repository.findByName(name);
        if (existing && existing.id !== excludeId) {
            throw new app_error_1.AppError(409, "Role name already in use");
        }
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map