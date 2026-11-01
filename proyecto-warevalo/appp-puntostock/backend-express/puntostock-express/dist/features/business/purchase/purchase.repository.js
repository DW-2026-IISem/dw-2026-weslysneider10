"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const purchase_model_1 = require("./purchase.model");
const purchase_detail_model_1 = require("./purchase-detail.model");
/**
 * Capa Repository del feature Purchase.
 * Única responsable de hablar con Sequelize (Purchase y su detalle
 * PurchaseDetail). No conoce reglas de negocio ni `req`/`res`.
 */
class PurchaseRepository {
    /** Todas las compras, filtrables por proveedor/sucursal/estado, con sus items. */
    async findAll(filters) {
        const where = {};
        if (filters.supplierId !== undefined)
            where.supplierId = filters.supplierId;
        if (filters.branchId !== undefined)
            where.branchId = filters.branchId;
        if (filters.estado !== undefined)
            where.estado = filters.estado;
        return purchase_model_1.Purchase.findAll({
            where,
            include: [{ model: purchase_detail_model_1.PurchaseDetail, as: "items" }],
            order: [["createdAt", "DESC"]],
        });
    }
    /** Una compra por PK, con sus items (o `null`). Acepta transacción. */
    async findById(id, transaction) {
        return purchase_model_1.Purchase.findByPk(id, {
            include: [{ model: purchase_detail_model_1.PurchaseDetail, as: "items" }],
            transaction,
        });
    }
    /** Inserta la cabecera de la compra. */
    async create(data, transaction) {
        return purchase_model_1.Purchase.create(data, { transaction });
    }
    /** Inserta los items de la compra en bloque. */
    async createDetails(details, transaction) {
        return purchase_detail_model_1.PurchaseDetail.bulkCreate(details, { transaction });
    }
    /** Todos los items de una compra. Acepta transacción. */
    async findDetailsByPurchaseId(purchaseId, transaction) {
        return purchase_detail_model_1.PurchaseDetail.findAll({ where: { purchaseId }, transaction });
    }
    /** Persiste cambios sobre un item existente (ej. receivedQuantity). */
    async updateDetail(detail, data, transaction) {
        return detail.update(data, { transaction });
    }
    /** Persiste cambios sobre la cabecera (ej. estado). */
    async update(purchase, data, transaction) {
        return purchase.update(data, { transaction });
    }
    /** Elimina los items de una compra. */
    async deleteDetailsByPurchaseId(purchaseId, transaction) {
        await purchase_detail_model_1.PurchaseDetail.destroy({ where: { purchaseId }, transaction });
    }
    /** Elimina físicamente la cabecera. */
    async delete(purchase, transaction) {
        await purchase.destroy({ transaction });
    }
}
exports.PurchaseRepository = PurchaseRepository;
//# sourceMappingURL=purchase.repository.js.map