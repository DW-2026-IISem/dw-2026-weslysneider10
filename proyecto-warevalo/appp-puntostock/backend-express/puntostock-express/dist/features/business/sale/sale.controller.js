"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const sale_service_1 = require("./sale.service");
/**
 * Capa Controller del feature Sale.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una venta se modifica a través de sus
 * propias operaciones de negocio (cancel), no por edición libre.
 */
class SaleController extends base_controller_1.BaseController {
    constructor(service = new sale_service_1.SaleService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const { clientId, branchId, estado } = req.query;
            const sales = await this.service.getAll({
                clientId: clientId ? Number(clientId) : undefined,
                branchId: branchId ? Number(branchId) : undefined,
                estado: estado ? String(estado) : undefined,
            });
            res.status(200).json({ sales });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const sale = await this.service.getOne(this.paramId(req));
            res.status(200).json({ sale });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const sale = await this.service.create(req.body);
            res.status(201).json({ sale });
        });
    }
    // ================== CANCEL ==================
    async cancel(req, res) {
        await this.run(res, async () => {
            const sale = await this.service.cancel(this.paramId(req));
            res.status(200).json({ sale });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física: borra detalle y cabecera en transacción. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Sale permanently deleted", id });
        });
    }
}
exports.SaleController = SaleController;
//# sourceMappingURL=sale.controller.js.map