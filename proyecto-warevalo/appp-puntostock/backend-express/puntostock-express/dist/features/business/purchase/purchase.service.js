"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const dto_1 = require("./dto");
const purchase_repository_1 = require("./purchase.repository");
const supplier_model_1 = require("../supplier/supplier.model");
const branch_model_1 = require("../branch/branch.model");
const product_model_1 = require("../product/product.model");
const inventory_repository_1 = require("../inventory/inventory.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const with_transaction_1 = require("../../../shared/database/with-transaction");
/**
 * Capa Service del feature Purchase.
 *
 * Reglas de negocio: validación de Supplier/Branch/Product, cálculo de
 * subtotal/total, flujo de estado (pending -> partial/received, o
 * cancelled), recepción de mercancía (actualiza Inventory reutilizando
 * InventoryRepository) y borrado en cascada (items + cabecera).
 *
 * No conoce `req`/`res`; las operaciones multi-tabla se envuelven en
 * `withTransaction` (commit/rollback automático).
 */
class PurchaseService {
    constructor(repository = new purchase_repository_1.PurchaseRepository(), inventoryRepository = new inventory_repository_1.InventoryRepository()) {
        this.repository = repository;
        this.inventoryRepository = inventoryRepository;
    }
    // ================== READ ==================
    async getAll(filters) {
        const purchases = await this.repository.findAll(filters);
        return purchases.map((purchase) => (0, dto_1.toPurchaseResponse)(purchase));
    }
    async getOne(id) {
        return (0, dto_1.toPurchaseResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        if (!body.items || body.items.length === 0) {
            throw new app_error_1.AppError(400, "La compra debe tener al menos un item");
        }
        return (0, with_transaction_1.withTransaction)(async (transaction) => {
            await this.assertSupplierExists(body.supplierId);
            await this.assertBranchExists(body.branchId);
            let subtotal = 0;
            for (const item of body.items) {
                await this.assertProductExists(item.productId);
                if (item.cantidad <= 0 || item.valorUnitario <= 0) {
                    throw new app_error_1.AppError(400, "cantidad y valorUnitario deben ser mayores a 0");
                }
                subtotal += item.cantidad * item.valorUnitario;
            }
            const impuestos = body.impuestos ?? 0;
            const total = subtotal + impuestos;
            const purchase = await this.repository.create({
                supplierId: body.supplierId,
                branchId: body.branchId,
                fecha: new Date(),
                subtotal,
                impuestos,
                total,
                estado: "pending",
            }, transaction);
            await this.repository.createDetails(body.items.map((item) => ({
                purchaseId: purchase.id,
                productId: item.productId,
                cantidad: item.cantidad,
                valorUnitario: item.valorUnitario,
                total: item.cantidad * item.valorUnitario,
                receivedQuantity: 0,
                observaciones: item.observaciones ?? null,
            })), transaction);
            const created = await this.repository.findById(purchase.id, transaction);
            return (0, dto_1.toPurchaseResponse)(created);
        });
    }
    // ================== RECEIVE ==================
    /** Recepción parcial o total de una compra. Actualiza Inventory de la sucursal. */
    async receive(id, body) {
        return (0, with_transaction_1.withTransaction)(async (transaction) => {
            const purchase = await this.repository.findById(id, transaction);
            if (!purchase) {
                throw new app_error_1.AppError(404, "Purchase not found");
            }
            if (purchase.estado === "cancelled" || purchase.estado === "received") {
                throw new app_error_1.AppError(400, `No se puede recibir una compra en estado '${purchase.estado}'`);
            }
            const items = purchase.items;
            for (const receipt of body.items) {
                const detail = items.find((i) => i.productId === receipt.productId);
                if (!detail) {
                    throw new app_error_1.AppError(400, `El producto '${receipt.productId}' no pertenece a esta compra`);
                }
                if (receipt.cantidad <= 0) {
                    throw new app_error_1.AppError(400, "La cantidad a recibir debe ser mayor a 0");
                }
                if (detail.receivedQuantity + receipt.cantidad > detail.cantidad) {
                    throw new app_error_1.AppError(400, `La cantidad recibida no puede superar lo solicitado para el producto '${receipt.productId}'`);
                }
                await detail.update({ receivedQuantity: detail.receivedQuantity + receipt.cantidad }, { transaction });
                const existingInventory = await this.inventoryRepository.findByBranchAndProduct(purchase.branchId, receipt.productId);
                if (existingInventory) {
                    await this.inventoryRepository.update(existingInventory, {
                        quantity: existingInventory.quantity + receipt.cantidad,
                    });
                }
                else {
                    await this.inventoryRepository.create({
                        branchId: purchase.branchId,
                        productId: receipt.productId,
                        quantity: receipt.cantidad,
                        minStock: 0,
                    });
                }
            }
            const refreshedItems = await this.repository.findDetailsByPurchaseId(purchase.id, transaction);
            const allReceived = refreshedItems.every((i) => i.receivedQuantity >= i.cantidad);
            const anyReceived = refreshedItems.some((i) => i.receivedQuantity > 0);
            const nuevoEstado = allReceived ? "received" : anyReceived ? "partial" : "pending";
            await this.repository.update(purchase, { estado: nuevoEstado }, transaction);
            const updated = await this.repository.findById(id, transaction);
            return (0, dto_1.toPurchaseResponse)(updated);
        });
    }
    // ================== CANCEL ==================
    async cancel(id) {
        const purchase = await this.findOrFail(id);
        if (purchase.estado === "received") {
            throw new app_error_1.AppError(400, "No se puede cancelar una compra ya recibida");
        }
        await this.repository.update(purchase, { estado: "cancelled" });
        return (0, dto_1.toPurchaseResponse)(purchase);
    }
    // ================== DELETE ==================
    /** Eliminación física: borra detalle y cabecera en una sola transacción. */
    async deletePhysical(id) {
        await (0, with_transaction_1.withTransaction)(async (transaction) => {
            const purchase = await this.repository.findById(id, transaction);
            if (!purchase) {
                throw new app_error_1.AppError(404, "Purchase not found");
            }
            await this.repository.deleteDetailsByPurchaseId(id, transaction);
            await this.repository.delete(purchase, transaction);
        });
    }
    // ================== HELPERS ==================
    async findOrFail(id) {
        const purchase = await this.repository.findById(id);
        if (!purchase) {
            throw new app_error_1.AppError(404, "Purchase not found");
        }
        return purchase;
    }
    async assertSupplierExists(supplierId) {
        const supplier = await supplier_model_1.Supplier.findByPk(supplierId);
        if (!supplier) {
            throw new app_error_1.AppError(404, "Supplier not found");
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
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map