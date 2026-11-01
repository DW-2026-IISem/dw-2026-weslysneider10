"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const role_user_service_1 = require("./role-user.service");
/**
 * Capa Controller del feature RoleUser.
 * No expone borrado físico: la revocación es lógica para preservar auditoría.
 */
class RoleUserController extends base_controller_1.BaseController {
    constructor(service = new role_user_service_1.RoleUserService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const assignments = await this.service.getAll();
            res.status(200).json({ assignments });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const assignment = await this.service.getOne(this.paramId(req));
            res.status(200).json({ assignment });
        });
    }
    // ================== CREATE (asignar) ==================
    async assign(req, res) {
        await this.run(res, async () => {
            const assignment = await this.service.assign(req.body);
            res.status(201).json({ assignment });
        });
    }
    // ================== STATE ==================
    /** Retirar el rol (borrado lógico). */
    async deactivate(req, res) {
        await this.run(res, async () => {
            const assignment = await this.service.deactivate(this.paramId(req));
            res.status(200).json({ message: "Role assignment deactivated", assignment });
        });
    }
    /** Reactivar la asignación. */
    async reactivate(req, res) {
        await this.run(res, async () => {
            const assignment = await this.service.reactivate(this.paramId(req));
            res.status(200).json({ message: "Role assignment reactivated", assignment });
        });
    }
}
exports.RoleUserController = RoleUserController;
//# sourceMappingURL=role-user.controller.js.map