"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const branch_service_1 = require("./branch.service");
/**
 * Capa Controller del feature Branch.
 * Solo HTTP: lee req, llama al service y arma res. El try/catch y la
 * validación de :id viven en BaseController.
 */
class BranchController extends base_controller_1.BaseController {
    constructor(service = new branch_service_1.BranchService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const branches = await this.service.getAll();
            res.status(200).json({ branches });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.getOne(this.paramId(req));
            res.status(200).json({ branch });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.create(req.body);
            res.status(201).json({ branch });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ branch });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ branch });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Branch permanently deleted", id });
        });
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Branch deactivated (logical delete)", branch });
        });
    }
}
exports.BranchController = BranchController;
//# sourceMappingURL=branch.controller.js.map