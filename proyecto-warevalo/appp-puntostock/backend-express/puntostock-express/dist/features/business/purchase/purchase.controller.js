"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const purchase_service_1 = require("./purchase.service");
/**
 * Capa Controller del feature Purchase.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una compra se modifica a través de sus
 * propias operaciones de negocio (receive, cancel), no por edición libre.
 */
class PurchaseController extends base_controller_1.BaseController {
    constructor(service = new purchase_service_1.PurchaseService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const { supplierId, branchId, estado } = req.query;
            const purchases = await this.service.getAll({
                supplierId: supplierId ? Number(supplierId) : undefined,
                branchId: branchId ? Number(branchId) : undefined,
                estado: estado ? String(estado) : undefined,
            });
            res.status(200).json({ purchases });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const purchase = await this.service.getOne(this.paramId(req));
            res.status(200).json({ purchase });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const purchase = await this.service.create(req.body);
            res.status(201).json({ purchase });
        });
    }
    // ================== RECEIVE ==================
    /** Recepción parcial o total de una compra. */
    async receive(req, res) {
        await this.run(res, async () => {
            const purchase = await this.service.receive(this.paramId(req), req.body);
            res.status(200).json({ purchase });
        });
    }
    // ================== CANCEL ==================
    async cancel(req, res) {
        await this.run(res, async () => {
            const purchase = await this.service.cancel(this.paramId(req));
            res.status(200).json({ purchase });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física: borra detalle y cabecera en transacción. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Purchase permanently deleted", id });
        });
    }
}
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map