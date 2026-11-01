"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const dto_1 = require("./dto");
const product_repository_1 = require("./product.repository");
const product_type_model_1 = require("../product-type/product-type.model");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Product.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico, validación de `productTypeId` (debe existir y estar
 * `active`) y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
class ProductService {
    constructor(repository = new product_repository_1.ProductRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const products = await this.repository.findAllActive();
        return products.map((product) => (0, dto_1.toProductResponse)(product));
    }
    async getOne(id) {
        return (0, dto_1.toProductResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        await this.assertActiveProductType(body.productTypeId);
        const product = await this.repository.create({
            sku: body.sku,
            name: body.name,
            description: body.description ?? null,
            price: body.price,
            productTypeId: body.productTypeId,
            status: body.status ?? "active",
        });
        return (0, dto_1.toProductResponse)(product);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const product = await this.findOrFail(id);
        await this.assertActiveProductType(body.productTypeId);
        await this.repository.update(product, {
            sku: body.sku,
            name: body.name,
            description: body.description ?? null,
            price: body.price,
            productTypeId: body.productTypeId,
        });
        return (0, dto_1.toProductResponse)(product);
    }
    async updatePatch(id, body) {
        const product = await this.findOrFail(id);
        if (body.productTypeId !== undefined) {
            await this.assertActiveProductType(body.productTypeId);
        }
        await this.repository.update(product, body);
        return (0, dto_1.toProductResponse)(product);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const product = await this.findOrFail(id, false);
        await this.repository.delete(product);
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(id) {
        const product = await this.findOrFail(id);
        await this.repository.update(product, { status: "inactive" });
        return (0, dto_1.toProductResponse)(product);
    }
    // ================== HELPERS ==================
    /**
     * Busca por PK y falla con 404 si no existe.
     *
     * `onlyActive` (por defecto true) aplica la política de borrado lógico:
     * un registro inactive deja de ser visible para la API.
     */
    async findOrFail(id, onlyActive = true) {
        const product = await this.repository.findById(id);
        if (!product || (onlyActive && product.status !== "active")) {
            throw new app_error_1.AppError(404, "Product not found");
        }
        return product;
    }
    /** Valida que el tipo de producto exista y esté activo. */
    async assertActiveProductType(productTypeId) {
        const productType = await product_type_model_1.ProductType.findByPk(productTypeId);
        if (!productType) {
            throw new app_error_1.AppError(404, "Product type not found");
        }
        if (productType.status !== "active") {
            throw new app_error_1.AppError(400, "Product type must be active");
        }
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map