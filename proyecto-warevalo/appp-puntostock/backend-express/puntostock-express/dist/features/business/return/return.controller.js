"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const return_service_1 = require("./return.service");
/**
 * Capa Controller del feature Return.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 *
 * No tiene updatePut/updatePatch: una devolución se modifica a través de
 * sus propias operaciones de negocio (approve, reject).
 */
class ReturnController extends base_controller_1.BaseController {
    constructor(service = new return_service_1.ReturnService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const { saleDetailId, estado } = req.query;
            const returns = await this.service.getAll({
                saleDetailId: saleDetailId ? Number(saleDetailId) : undefined,
                estado: estado ? String(estado) : undefined,
            });
            res.status(200).json({ returns });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const ret = await this.service.getOne(this.paramId(req));
            res.status(200).json({ return: ret });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const ret = await this.service.create(req.body);
            res.status(201).json({ return: ret });
        });
    }
    // ================== APPROVE / REJECT ==================
    async approve(req, res) {
        await this.run(res, async () => {
            const ret = await this.service.approve(this.paramId(req));
            res.status(200).json({ return: ret });
        });
    }
    async reject(req, res) {
        await this.run(res, async () => {
            const ret = await this.service.reject(this.paramId(req));
            res.status(200).json({ return: ret });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. Bloqueada si ya está `approved`. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Return permanently deleted", id });
        });
    }
}
exports.ReturnController = ReturnController;
//# sourceMappingURL=return.controller.js.map