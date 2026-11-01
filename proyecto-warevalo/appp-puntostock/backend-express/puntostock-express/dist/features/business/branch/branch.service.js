"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchService = void 0;
const dto_1 = require("./dto");
const branch_repository_1 = require("./branch.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Branch.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
class BranchService {
    constructor(repository = new branch_repository_1.BranchRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const branches = await this.repository.findAllActive();
        return branches.map((branch) => (0, dto_1.toBranchResponse)(branch));
    }
    async getOne(id) {
        return (0, dto_1.toBranchResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        const branch = await this.repository.create({
            name: body.name,
            description: body.description ?? null,
            status: body.status ?? "active",
        });
        return (0, dto_1.toBranchResponse)(branch);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const branch = await this.findOrFail(id);
        await this.repository.update(branch, {
            name: body.name,
            description: body.description ?? null,
        });
        return (0, dto_1.toBranchResponse)(branch);
    }
    async updatePatch(id, body) {
        const branch = await this.findOrFail(id);
        await this.repository.update(branch, body);
        return (0, dto_1.toBranchResponse)(branch);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        // onlyActive: false -> también permite purgar un registro ya desactivado.
        const branch = await this.findOrFail(id, false);
        await this.repository.delete(branch);
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(id) {
        const branch = await this.findOrFail(id);
        await this.repository.update(branch, { status: "inactive" });
        return (0, dto_1.toBranchResponse)(branch);
    }
    // ================== HELPERS ==================
    /**
     * Busca por PK y falla con 404 si no existe.
     *
     * `onlyActive` (por defecto true) aplica la política de borrado lógico:
     * un registro inactive deja de ser visible para la API, igual que en
     * getAll. Así getOne, updatePut, updatePatch y deleteLogical quedan
     * consistentes sin repetir la comprobación en cada método.
     */
    async findOrFail(id, onlyActive = true) {
        const branch = await this.repository.findById(id);
        if (!branch || (onlyActive && branch.status !== "active")) {
            throw new app_error_1.AppError(404, "Branch not found");
        }
        return branch;
    }
}
exports.BranchService = BranchService;
//# sourceMappingURL=branch.service.js.map