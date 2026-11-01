"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRepository = void 0;
const supplier_model_1 = require("./supplier.model");
/**
 * Capa Repository del feature Supplier.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class SupplierRepository {
    /** Todos los proveedores activos. */
    async findAllActive() {
        return supplier_model_1.Supplier.findAll({ where: { isActive: true } });
    }
    /** Un proveedor por PK (o `null`). */
    async findById(id) {
        return supplier_model_1.Supplier.findByPk(id);
    }
    /** Inserta un proveedor. */
    async create(data) {
        return supplier_model_1.Supplier.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(supplier, data) {
        return supplier.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(supplier) {
        await supplier.destroy();
    }
}
exports.SupplierRepository = SupplierRepository;
//# sourceMappingURL=supplier.repository.js.map