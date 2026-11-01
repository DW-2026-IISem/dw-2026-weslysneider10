"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeRepository = void 0;
const product_type_model_1 = require("./product-type.model");
/**
 * Capa Repository del feature ProductType.
 * Única responsable de hablar con Sequelize. No conoce reglas de negocio
 * ni `req`/`res`.
 */
class ProductTypeRepository {
    /** Todos los tipos de producto activos. */
    async findAllActive() {
        return product_type_model_1.ProductType.findAll({ where: { status: "active" } });
    }
    /** Un tipo de producto por PK (o `null`). */
    async findById(id) {
        return product_type_model_1.ProductType.findByPk(id);
    }
    /** Inserta un tipo de producto. */
    async create(data) {
        return product_type_model_1.ProductType.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(productType, data) {
        return productType.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(productType) {
        await productType.destroy();
    }
}
exports.ProductTypeRepository = ProductTypeRepository;
//# sourceMappingURL=product-type.repository.js.map