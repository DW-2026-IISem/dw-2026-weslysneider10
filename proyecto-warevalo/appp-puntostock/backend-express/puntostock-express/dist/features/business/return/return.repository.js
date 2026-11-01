"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRepository = void 0;
const return_model_1 = require("./return.model");
/**
 * Capa Repository del feature Return.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class ReturnRepository {
    /** Todas las devoluciones, filtrables por saleDetailId/estado. */
    async findAll(filters) {
        const where = {};
        if (filters.saleDetailId !== undefined)
            where.saleDetailId = filters.saleDetailId;
        if (filters.estado !== undefined)
            where.estado = filters.estado;
        return return_model_1.Return.findAll({ where, order: [["createdAt", "DESC"]] });
    }
    /** Una devolución por PK (o `null`). Acepta transacción. */
    async findById(id, transaction) {
        return return_model_1.Return.findByPk(id, { transaction });
    }
    /** Devoluciones aprobadas de una línea de venta (para calcular lo ya devuelto). */
    async findApprovedBySaleDetailId(saleDetailId) {
        return return_model_1.Return.findAll({ where: { saleDetailId, estado: "approved" } });
    }
    /** Inserta una devolución. */
    async create(data) {
        return return_model_1.Return.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(ret, data, transaction) {
        return ret.update(data, { transaction });
    }
    /** Elimina físicamente una instancia. */
    async delete(ret) {
        await ret.destroy();
    }
}
exports.ReturnRepository = ReturnRepository;
//# sourceMappingURL=return.repository.js.map