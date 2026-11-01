"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const auth_user_1 = require("../../../shared/auth/auth-user");
const session_service_1 = require("./session.service");
/**
 * Capa Controller del feature Session.
 *
 * Mezcla las dos modalidades base:
 *  - login, refresh y logout son OPEN (no hay identidad previa; la
 *    credencial va en el cuerpo);
 *  - profile y myPermissions son JWT (la identidad la resolvió
 *    authenticate antes de llegar aquí).
 */
class SessionController extends base_controller_1.BaseController {
    constructor(service = new session_service_1.SessionService()) {
        super();
        this.service = service;
    }
    // ================== OPEN ==================
    /** Inicia sesión: credenciales -> par de tokens. */
    async login(req, res) {
        await this.run(res, async () => {
            const tokens = await this.service.login(req.body, deviceInfo(req));
            res.status(200).json(tokens);
        });
    }
    /** Renueva el access token rotando el refresh token. */
    async refresh(req, res) {
        await this.run(res, async () => {
            const tokens = await this.service.refresh(req.body, deviceInfo(req));
            res.status(200).json(tokens);
        });
    }
    /** Cierra la sesión del refresh token presentado. */
    async logout(req, res) {
        await this.run(res, async () => {
            await this.service.logout(req.body);
            res.status(200).json({ message: "Session closed" });
        });
    }
    // ================== JWT ==================
    /** Perfil del usuario autenticado. */
    async profile(req, res) {
        await this.run(res, async () => {
            const user = await this.service.profile((0, auth_user_1.requireAuthUser)(req).id);
            res.status(200).json({ user });
        });
    }
    /** Permisos efectivos del usuario autenticado. */
    async myPermissions(req, res) {
        await this.run(res, async () => {
            const permissions = await this.service.myPermissions((0, auth_user_1.requireAuthUser)(req).id);
            res.status(200).json({ permissions });
        });
    }
}
exports.SessionController = SessionController;
/** device_info de auditoría a partir del encabezado User-Agent. */
function deviceInfo(req) {
    const value = req.headers["user-agent"];
    if (!value)
        return null;
    return String(value).slice(0, 500);
}
//# sourceMappingURL=session.controller.js.map