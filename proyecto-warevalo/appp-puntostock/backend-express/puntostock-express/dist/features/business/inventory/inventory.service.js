"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const dto_1 = require("./dto");
const inventory_repository_1 = require("./inventory.repository");
const branch_model_1 = require("../branch/branch.model");
const product_model_1 = require("../product/product.model");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Inventory.
 *
 * Reglas de negocio: validación de que `branchId`/`productId` existan,
 * unicidad de la clave compuesta (sucursal + producto) y saneamiento
 * de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 *
 * Inventory no tiene `status`/`isActive`: no existe borrado lógico, solo
 * eliminación física.
 */
class InventoryService {
    constructor(repository = new inventory_repository_1.InventoryRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll(filters) {
        const inventories = await this.repository.findAll(filters);
        return inventories.map((inventory) => (0, dto_1.toInventoryResponse)(inventory));
    }
    async getOne(id) {
        return (0, dto_1.toInventoryResponse)(await this.findOrFail(id));
    }
    /** Registros con quantity <= minStock, filtrables por sucursal. */
    async getLowStock(branchId) {
        const inventories = await this.repository.findLowStock(branchId);
        return inventories.map((inventory) => (0, dto_1.toInventoryResponse)(inventory));
    }
    // ================== CREATE ==================
    async create(body) {
        await this.assertBranchExists(body.branchId);
        await this.assertProductExists(body.productId);
        await this.assertUniqueBranchProduct(body.branchId, body.productId);
        const inventory = await this.repository.create({
            branchId: body.branchId,
            productId: body.productId,
            quantity: body.quantity ?? 0,
            minStock: body.minStock ?? 0,
        });
        return (0, dto_1.toInventoryResponse)(inventory);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const inventory = await this.findOrFail(id);
        await this.repository.update(inventory, {
            quantity: body.quantity,
            minStock: body.minStock,
        });
        return (0, dto_1.toInventoryResponse)(inventory);
    }
    async updatePatch(id, body) {
        const inventory = await this.findOrFail(id);
        await this.repository.update(inventory, body);
        return (0, dto_1.toInventoryResponse)(inventory);
    }
    // ================== DELETE ==================
    /** Eliminación física. Inventory no tiene borrado lógico. */
    async deletePhysical(id) {
        const inventory = await this.findOrFail(id);
        await this.repository.delete(inventory);
    }
    // ================== HELPERS ==================
    /** Busca por PK y falla con 404 si no existe. */
    async findOrFail(id) {
        const inventory = await this.repository.findById(id);
        if (!inventory) {
            throw new app_error_1.AppError(404, "Inventory not found");
        }
        return inventory;
    }
    async assertBranchExists(branchId) {
        const branch = await branch_model_1.Branch.findByPk(branchId);
        if (!branch) {
            throw new app_error_1.AppError(404, "Branch not found");
        }
    }
    async assertProductExists(productId) {
        const product = await product_model_1.Product.findByPk(productId);
        if (!product) {
            throw new app_error_1.AppError(404, "Product not found");
        }
    }
    async assertUniqueBranchProduct(branchId, productId) {
        const existing = await this.repository.findByBranchAndProduct(branchId, productId);
        if (existing) {
            throw new app_error_1.AppError(409, `Ya existe un registro de inventario para la sucursal '${branchId}' y el producto '${productId}'`);
        }
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map