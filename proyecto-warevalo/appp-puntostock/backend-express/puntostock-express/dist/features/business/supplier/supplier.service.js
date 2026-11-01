"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
const dto_1 = require("./dto");
const supplier_repository_1 = require("./supplier.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Supplier.
 *
 * Reglas de negocio: default de `isActive`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
class SupplierService {
    constructor(repository = new supplier_repository_1.SupplierRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const suppliers = await this.repository.findAllActive();
        return suppliers.map((supplier) => (0, dto_1.toSupplierResponse)(supplier));
    }
    async getOne(id) {
        return (0, dto_1.toSupplierResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        const supplier = await this.repository.create({
            nit: body.nit,
            razonSocial: body.razonSocial,
            contacto: body.contacto ?? null,
            telefono: body.telefono ?? null,
            email: body.email ?? null,
            isActive: body.isActive ?? true,
        });
        return (0, dto_1.toSupplierResponse)(supplier);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const supplier = await this.findOrFail(id);
        await this.repository.update(supplier, {
            nit: body.nit,
            razonSocial: body.razonSocial,
            contacto: body.contacto ?? null,
            telefono: body.telefono ?? null,
            email: body.email ?? null,
        });
        return (0, dto_1.toSupplierResponse)(supplier);
    }
    async updatePatch(id, body) {
        const supplier = await this.findOrFail(id);
        await this.repository.update(supplier, body);
        return (0, dto_1.toSupplierResponse)(supplier);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const supplier = await this.findOrFail(id, false);
        await this.repository.delete(supplier);
    }
    /** Eliminación lógica -> isActive = false. */
    async deleteLogical(id) {
        const supplier = await this.findOrFail(id);
        await this.repository.update(supplier, { isActive: false });
        return (0, dto_1.toSupplierResponse)(supplier);
    }
    // ================== HELPERS ==================
    /**
     * Busca por PK y falla con 404 si no existe.
     *
     * `onlyActive` (por defecto true) aplica la política de borrado lógico:
     * un registro isActive = false deja de ser visible para la API.
     */
    async findOrFail(id, onlyActive = true) {
        const supplier = await this.repository.findById(id);
        if (!supplier || (onlyActive && !supplier.isActive)) {
            throw new app_error_1.AppError(404, "Supplier not found");
        }
        return supplier;
    }
}
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map