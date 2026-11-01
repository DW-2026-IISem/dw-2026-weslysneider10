"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const auth_user_1 = require("../../../shared/auth/auth-user");
const refresh_token_service_1 = require("./refresh-token.service");
/**
 * Capa Controller del feature RefreshToken — modalidad JWT.
 *
 * Todas las operaciones actúan sobre las sesiones del usuario autenticado
 * (req.auth.id). No exigen RBAC: poder ver y revocar tus propias sesiones
 * es un derecho derivado de estar autenticado, no de tener un permiso
 * concreto.
 */
class RefreshTokenController extends base_controller_1.BaseController {
    constructor(service = new refresh_token_service_1.RefreshTokenService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const sessions = await this.service.getAllMine((0, auth_user_1.requireAuthUser)(req).id);
            res.status(200).json({ sessions });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const session = await this.service.getMine((0, auth_user_1.requireAuthUser)(req).id, this.paramId(req));
            res.status(200).json({ session });
        });
    }
    // ================== STATE (revocar) ==================
    /** Revoca todas las sesiones del usuario autenticado. */
    async revokeAll(req, res) {
        await this.run(res, async () => {
            const revoked = await this.service.revokeAllMine((0, auth_user_1.requireAuthUser)(req).id);
            res.status(200).json({ message: "All sessions revoked", revoked });
        });
    }
    /** Revoca una sesión propia. */
    async revokeOne(req, res) {
        await this.run(res, async () => {
            const session = await this.service.revokeMine((0, auth_user_1.requireAuthUser)(req).id, this.paramId(req));
            res.status(200).json({ message: "Session revoked", session });
        });
    }
    // ================== PURGE ==================
    /** Purga (borrado físico) las sesiones propias ya revocadas o expiradas. */
    async purge(req, res) {
        await this.run(res, async () => {
            const purged = await this.service.purgeMine((0, auth_user_1.requireAuthUser)(req).id);
            res.status(200).json({ message: "Inactive sessions purged", purged });
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=refresh-token.controller.js.map