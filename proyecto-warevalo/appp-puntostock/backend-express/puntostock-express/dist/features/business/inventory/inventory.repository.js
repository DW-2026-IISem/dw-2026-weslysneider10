"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const sequelize_1 = require("sequelize");
const inventory_model_1 = require("./inventory.model");
/**
 * Capa Repository del feature Inventory.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class InventoryRepository {
    /** Todos los registros de inventario, filtrables por sucursal y/o producto. */
    async findAll(filters) {
        const where = {};
        if (filters.branchId !== undefined)
            where.branchId = filters.branchId;
        if (filters.productId !== undefined)
            where.productId = filters.productId;
        return inventory_model_1.Inventory.findAll({ where });
    }
    /** Un registro de inventario por PK (o `null`). */
    async findById(id) {
        return inventory_model_1.Inventory.findByPk(id);
    }
    /** Busca por la clave compuesta (sucursal + producto). Usado para evitar duplicados. */
    async findByBranchAndProduct(branchId, productId) {
        return inventory_model_1.Inventory.findOne({ where: { branchId, productId } });
    }
    /** Inserta un registro de inventario. */
    async create(data) {
        return inventory_model_1.Inventory.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(inventory, data) {
        return inventory.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(inventory) {
        await inventory.destroy();
    }
    /** Registros con quantity <= minStock, filtrables por sucursal. */
    async findLowStock(branchId) {
        const where = {
            [sequelize_1.Op.and]: [(0, sequelize_1.where)((0, sequelize_1.col)("quantity"), sequelize_1.Op.lte, (0, sequelize_1.col)("minStock"))],
        };
        if (branchId !== undefined)
            where.branchId = branchId;
        return inventory_model_1.Inventory.findAll({ where, order: [["quantity", "ASC"]] });
    }
}
exports.InventoryRepository = InventoryRepository;
//# sourceMappingURL=inventory.repository.js.map