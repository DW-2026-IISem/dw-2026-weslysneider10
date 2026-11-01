"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_model_1 = require("./product.model");
/**
 * Capa Repository del feature Product.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class ProductRepository {
    /** Todos los productos activos. */
    async findAllActive() {
        return product_model_1.Product.findAll({ where: { status: "active" } });
    }
    /** Un producto por PK (o `null`). */
    async findById(id) {
        return product_model_1.Product.findByPk(id);
    }
    /** Inserta un producto. */
    async create(data) {
        return product_model_1.Product.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(product, data) {
        return product.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(product) {
        await product.destroy();
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map