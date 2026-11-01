"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnService = void 0;
const dto_1 = require("./dto");
const return_repository_1 = require("./return.repository");
const sale_detail_model_1 = require("../sale/sale-detail.model");
const sale_model_1 = require("../sale/sale.model");
const inventory_repository_1 = require("../inventory/inventory.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const with_transaction_1 = require("../../../shared/database/with-transaction");
/**
 * Capa Service del feature Return.
 *
 * Reglas de negocio: validación de que `saleDetailId` exista y su venta no
 * esté cancelada, validación de que la cantidad acumulada devuelta no
 * supere lo vendido en esa línea, aprobación (repone Inventory
 * reutilizando InventoryRepository), rechazo, y borrado físico (bloqueado
 * si ya está `approved`, para no perder la trazabilidad del ajuste a
 * Inventory).
 *
 * No conoce `req`/`res`; `approve` se envuelve en `withTransaction`.
 */
class ReturnService {
    constructor(repository = new return_repository_1.ReturnRepository(), inventoryRepository = new inventory_repository_1.InventoryRepository()) {
        this.repository = repository;
        this.inventoryRepository = inventoryRepository;
    }
    // ================== READ ==================
    async getAll(filters) {
        const returns = await this.repository.findAll(filters);
        return returns.map((ret) => (0, dto_1.toReturnResponse)(ret));
    }
    async getOne(id) {
        return (0, dto_1.toReturnResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        if (body.cantidad <= 0) {
            throw new app_error_1.AppError(400, "La cantidad a devolver debe ser mayor a 0");
        }
        const saleDetail = await sale_detail_model_1.SaleDetail.findByPk(body.saleDetailId);
        if (!saleDetail) {
            throw new app_error_1.AppError(404, "SaleDetail not found");
        }
        const sale = await sale_model_1.Sale.findByPk(saleDetail.saleId);
        if (!sale || sale.estado === "cancelled") {
            throw new app_error_1.AppError(400, "No se puede devolver una línea de una venta cancelada o inexistente");
        }
        const previousReturns = await this.repository.findApprovedBySaleDetailId(body.saleDetailId);
        const alreadyReturned = previousReturns.reduce((sum, r) => sum + r.cantidad, 0);
        if (alreadyReturned + body.cantidad > saleDetail.cantidad) {
            throw new app_error_1.AppError(400, `La cantidad a devolver supera lo vendido en esa línea (vendido: ${saleDetail.cantidad}, ya devuelto: ${alreadyReturned})`);
        }
        const total = body.cantidad * Number(saleDetail.valorUnitario);
        const ret = await this.repository.create({
            saleDetailId: body.saleDetailId,
            fecha: new Date(),
            motivo: body.motivo,
            cantidad: body.cantidad,
            total,
            estado: "pending",
        });
        return (0, dto_1.toReturnResponse)(ret);
    }
    // ================== APPROVE / REJECT ==================
    /** Aprueba la devolución y repone el stock en Inventory. */
    async approve(id) {
        return (0, with_transaction_1.withTransaction)(async (transaction) => {
            const ret = await this.repository.findById(id, transaction);
            if (!ret) {
                throw new app_error_1.AppError(404, "Return not found");
            }
            if (ret.estado !== "pending") {
                throw new app_error_1.AppError(400, `No se puede aprobar una devolución en estado '${ret.estado}'`);
            }
            const saleDetail = await sale_detail_model_1.SaleDetail.findByPk(ret.saleDetailId, { transaction });
            if (!saleDetail) {
                throw new app_error_1.AppError(404, "SaleDetail not found");
            }
            const sale = await sale_model_1.Sale.findByPk(saleDetail.saleId, { transaction });
            if (!sale) {
                throw new app_error_1.AppError(404, "Sale not found");
            }
            const inventory = await this.inventoryRepository.findByBranchAndProduct(sale.branchId, saleDetail.productId);
            if (inventory) {
                await this.inventoryRepository.update(inventory, {
                    quantity: inventory.quantity + ret.cantidad,
                });
            }
            else {
                await this.inventoryRepository.create({
                    branchId: sale.branchId,
                    productId: saleDetail.productId,
                    quantity: ret.cantidad,
                    minStock: 0,
                });
            }
            await this.repository.update(ret, { estado: "approved" }, transaction);
            return (0, dto_1.toReturnResponse)(ret);
        });
    }
    async reject(id) {
        const ret = await this.findOrFail(id);
        if (ret.estado !== "pending") {
            throw new app_error_1.AppError(400, `No se puede rechazar una devolución en estado '${ret.estado}'`);
        }
        await this.repository.update(ret, { estado: "rejected" });
        return (0, dto_1.toReturnResponse)(ret);
    }
    // ================== DELETE ==================
    /** Eliminación física. Bloqueada si ya está `approved` (se perdería la trazabilidad del ajuste a Inventory). */
    async deletePhysical(id) {
        const ret = await this.findOrFail(id);
        if (ret.estado === "approved") {
            throw new app_error_1.AppError(400, "No se puede eliminar una devolución ya aprobada");
        }
        await this.repository.delete(ret);
    }
    // ================== HELPERS ==================
    async findOrFail(id) {
        const ret = await this.repository.findById(id);
        if (!ret) {
            throw new app_error_1.AppError(404, "Return not found");
        }
        return ret;
    }
}
exports.ReturnService = ReturnService;
//# sourceMappingURL=return.service.js.map