"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const role_service_1 = require("./role.service");
/**
 * Capa Controller del feature Role.
 * Solo HTTP: lee req, llama al service y arma res.
 */
class RoleController extends base_controller_1.BaseController {
    constructor(service = new role_service_1.RoleService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const roles = await this.service.getAll();
            res.status(200).json({ roles });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const role = await this.service.getOne(this.paramId(req));
            res.status(200).json({ role });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const role = await this.service.create(req.body);
            res.status(201).json({ role });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const role = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ role });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const role = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ role });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Role permanently deleted", id });
        });
    }
    /** Eliminación lógica -> status = inactive. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const role = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Role deactivated (logical delete)", role });
        });
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map