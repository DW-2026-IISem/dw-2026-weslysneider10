"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeService = void 0;
const dto_1 = require("./dto");
const product_type_repository_1 = require("./product-type.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature ProductType.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
class ProductTypeService {
    constructor(repository = new product_type_repository_1.ProductTypeRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const productTypes = await this.repository.findAllActive();
        return productTypes.map((productType) => (0, dto_1.toProductTypeResponse)(productType));
    }
    async getOne(id) {
        return (0, dto_1.toProductTypeResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        const productType = await this.repository.create({
            name: body.name,
            description: body.description ?? null,
            status: body.status ?? "active",
        });
        return (0, dto_1.toProductTypeResponse)(productType);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const productType = await this.findOrFail(id);
        await this.repository.update(productType, {
            name: body.name,
            description: body.description ?? null,
        });
        return (0, dto_1.toProductTypeResponse)(productType);
    }
    async updatePatch(id, body) {
        const productType = await this.findOrFail(id);
        await this.repository.update(productType, body);
        return (0, dto_1.toProductTypeResponse)(productType);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const productType = await this.findOrFail(id, false);
        await this.repository.delete(productType);
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(id) {
        const productType = await this.findOrFail(id);
        await this.repository.update(productType, { status: "inactive" });
        return (0, dto_1.toProductTypeResponse)(productType);
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
        const productType = await this.repository.findById(id);
        if (!productType || (onlyActive && productType.status !== "active")) {
            throw new app_error_1.AppError(404, "Product type not found");
        }
        return productType;
    }
}
exports.ProductTypeService = ProductTypeService;
//# sourceMappingURL=product-type.service.js.map