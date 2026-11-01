"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRepository = void 0;
const branch_model_1 = require("./branch.model");
/**
 * Capa Repository del feature Branch.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class BranchRepository {
    /** Todas las sucursales activas. */
    async findAllActive() {
        return branch_model_1.Branch.findAll({ where: { status: "active" } });
    }
    /** Una sucursal por PK (o `null`). */
    async findById(id) {
        return branch_model_1.Branch.findByPk(id);
    }
    /** Inserta una sucursal. */
    async create(data) {
        return branch_model_1.Branch.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(branch, data) {
        return branch.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(branch) {
        await branch.destroy();
    }
}
exports.BranchRepository = BranchRepository;
//# sourceMappingURL=branch.repository.js.map