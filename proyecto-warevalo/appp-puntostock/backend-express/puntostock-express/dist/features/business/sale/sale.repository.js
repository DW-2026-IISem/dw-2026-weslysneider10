"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRepository = void 0;
const sale_model_1 = require("./sale.model");
const sale_detail_model_1 = require("./sale-detail.model");
/**
 * Capa Repository del feature Sale.
 * Única responsable de hablar con Sequelize (Sale y su detalle
 * SaleDetail). No conoce reglas de negocio ni `req`/`res`.
 */
class SaleRepository {
    /** Todas las ventas, filtrables por cliente/sucursal/estado, con sus items. */
    async findAll(filters) {
        const where = {};
        if (filters.clientId !== undefined)
            where.clientId = filters.clientId;
        if (filters.branchId !== undefined)
            where.branchId = filters.branchId;
        if (filters.estado !== undefined)
            where.estado = filters.estado;
        return sale_model_1.Sale.findAll({
            where,
            include: [{ model: sale_detail_model_1.SaleDetail, as: "items" }],
            order: [["createdAt", "DESC"]],
        });
    }
    /** Una venta por PK, con sus items (o `null`). Acepta transacción. */
    async findById(id, transaction) {
        return sale_model_1.Sale.findByPk(id, {
            include: [{ model: sale_detail_model_1.SaleDetail, as: "items" }],
            transaction,
        });
    }
    /** Inserta la cabecera de la venta. */
    async create(data, transaction) {
        return sale_model_1.Sale.create(data, { transaction });
    }
    /** Inserta un item de la venta. */
    async createDetail(data, transaction) {
        return sale_detail_model_1.SaleDetail.create(data, { transaction });
    }
    /** Persiste cambios sobre la cabecera (ej. estado). */
    async update(sale, data, transaction) {
        return sale.update(data, { transaction });
    }
    /** Elimina los items de una venta. */
    async deleteDetailsBySaleId(saleId, transaction) {
        await sale_detail_model_1.SaleDetail.destroy({ where: { saleId }, transaction });
    }
    /** Elimina físicamente la cabecera. */
    async delete(sale, transaction) {
        await sale.destroy({ transaction });
    }
}
exports.SaleRepository = SaleRepository;
//# sourceMappingURL=sale.repository.js.map