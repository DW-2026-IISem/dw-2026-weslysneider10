"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleService = void 0;
const dto_1 = require("./dto");
const sale_repository_1 = require("./sale.repository");
const client_model_1 = require("../client/client.model");
const branch_model_1 = require("../branch/branch.model");
const product_model_1 = require("../product/product.model");
const inventory_repository_1 = require("../inventory/inventory.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const with_transaction_1 = require("../../../shared/database/with-transaction");
/**
 * Capa Service del feature Sale.
 *
 * Reglas de negocio: validación de Client/Branch/Product, validación de
 * disponibilidad en Inventory, descuento de stock al crear, reposición de
 * stock al cancelar (reutilizando InventoryRepository) y borrado en
 * cascada (items + cabecera).
 *
 * No conoce `req`/`res`; las operaciones multi-tabla se envuelven en
 * `withTransaction` (commit/rollback automático).
 */
class SaleService {
    constructor(repository = new sale_repository_1.SaleRepository(), inventoryRepository = new inventory_repository_1.InventoryRepository()) {
        this.repository = repository;
        this.inventoryRepository = inventoryRepository;
    }
    // ================== READ ==================
    async getAll(filters) {
        const sales = await this.repository.findAll(filters);
        return sales.map((sale) => (0, dto_1.toSaleResponse)(sale));
    }
    async getOne(id) {
        return (0, dto_1.toSaleResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        if (!body.items || body.items.length === 0) {
            throw new app_error_1.AppError(400, "La venta debe tener al menos un item");
        }
        return (0, with_transaction_1.withTransaction)(async (transaction) => {
            await this.assertClientExists(body.clientId);
            await this.assertBranchExists(body.branchId);
            let subtotal = 0;
            const inventories = [];
            for (const item of body.items) {
                await this.assertProductExists(item.productId);
                if (item.cantidad <= 0 || item.valorUnitario <= 0) {
                    throw new app_error_1.AppError(400, "cantidad y valorUnitario deben ser mayores a 0");
                }
                const inventory = await this.inventoryRepository.findByBranchAndProduct(body.branchId, item.productId);
                if (!inventory || inventory.quantity < item.cantidad) {
                    throw new app_error_1.AppError(400, `Disponibilidad insuficiente para el producto '${item.productId}' en la sucursal '${body.branchId}'`);
                }
                inventories.push(inventory);
                subtotal += item.cantidad * item.valorUnitario;
            }
            const impuestos = body.impuestos ?? 0;
            const total = subtotal + impuestos;
            const sale = await this.repository.create({
                clientId: body.clientId,
                branchId: body.branchId,
                fecha: new Date(),
                subtotal,
                impuestos,
                total,
                estado: "completed",
            }, transaction);
            for (let i = 0; i < body.items.length; i++) {
                const item = body.items[i];
                const inventory = inventories[i];
                await this.repository.createDetail({
                    saleId: sale.id,
                    productId: item.productId,
                    cantidad: item.cantidad,
                    valorUnitario: item.valorUnitario,
                    total: item.cantidad * item.valorUnitario,
                    observaciones: item.observaciones ?? null,
                }, transaction);
                await this.inventoryRepository.update(inventory, {
                    quantity: inventory.quantity - item.cantidad,
                });
            }
            const created = await this.repository.findById(sale.id, transaction);
            return (0, dto_1.toSaleResponse)(created);
        });
    }
    // ================== CANCEL ==================
    /** Cancela la venta y repone el stock descontado. */
    async cancel(id) {
        return (0, with_transaction_1.withTransaction)(async (transaction) => {
            const sale = await this.repository.findById(id, transaction);
            if (!sale) {
                throw new app_error_1.AppError(404, "Sale not found");
            }
            if (sale.estado === "cancelled") {
                throw new app_error_1.AppError(400, "La venta ya está cancelada");
            }
            const items = sale.items;
            for (const item of items) {
                const inventory = await this.inventoryRepository.findByBranchAndProduct(sale.branchId, item.productId);
                if (inventory) {
                    await this.inventoryRepository.update(inventory, {
                        quantity: inventory.quantity + item.cantidad,
                    });
                }
                else {
                    await this.inventoryRepository.create({
                        branchId: sale.branchId,
                        productId: item.productId,
                        quantity: item.cantidad,
                        minStock: 0,
                    });
                }
            }
            await this.repository.update(sale, { estado: "cancelled" }, transaction);
            const updated = await this.repository.findById(id, transaction);
            return (0, dto_1.toSaleResponse)(updated);
        });
    }
    // ================== DELETE ==================
    /** Eliminación física: borra detalle y cabecera en transacción (no restaura inventario). */
    async deletePhysical(id) {
        await (0, with_transaction_1.withTransaction)(async (transaction) => {
            const sale = await this.repository.findById(id, transaction);
            if (!sale) {
                throw new app_error_1.AppError(404, "Sale not found");
            }
            await this.repository.deleteDetailsBySaleId(id, transaction);
            await this.repository.delete(sale, transaction);
        });
    }
    // ================== HELPERS ==================
    async findOrFail(id) {
        const sale = await this.repository.findById(id);
        if (!sale) {
            throw new app_error_1.AppError(404, "Sale not found");
        }
        return sale;
    }
    async assertClientExists(clientId) {
        const client = await client_model_1.Client.findByPk(clientId);
        if (!client) {
            throw new app_error_1.AppError(404, "Client not found");
        }
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
            throw new app_error_1.AppError(404, `Product not found: ${productId}`);
        }
    }
}
exports.SaleService = SaleService;
//# sourceMappingURL=sale.service.js.map