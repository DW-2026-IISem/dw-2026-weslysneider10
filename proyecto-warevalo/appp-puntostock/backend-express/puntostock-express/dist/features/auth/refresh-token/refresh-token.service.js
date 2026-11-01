"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const node_crypto_1 = require("node:crypto");
const dto_1 = require("./dto");
const refresh_token_repository_1 = require("./refresh-token.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const password_1 = require("../../../shared/auth/password");
const with_transaction_1 = require("../../../shared/database/with-transaction");
/** Vida útil de un refresh token (días). Configurable por entorno. */
const REFRESH_TTL_DAYS = Number(process.env.JWT_REFRESH_TTL_DAYS ?? 7);
/**
 * Capa Service del feature RefreshToken.
 *
 * Cubre dos responsabilidades:
 * 1. Gestión de las sesiones propias (listar, consultar, revocar): se
 *    expone con la modalidad JWT, sin RBAC, porque opera solo sobre las
 *    sesiones del usuario autenticado.
 * 2. Ciclo de vida del token (emitir, rotar, revocar), que consume el
 *    feature session en login/refresh/logout.
 */
class RefreshTokenService {
    constructor(repository = new refresh_token_repository_1.RefreshTokenRepository()) {
        this.repository = repository;
    }
    // ================== GESTIÓN (sesiones propias) ==================
    async getAllMine(userId) {
        const tokens = await this.repository.findAllByUser(userId);
        return tokens.map((token) => (0, dto_1.toRefreshTokenResponse)(token));
    }
    async getMine(userId, id) {
        return (0, dto_1.toRefreshTokenResponse)(await this.findMineOrFail(userId, id));
    }
    /** Revoca una sesión propia concreta. */
    async revokeMine(userId, id) {
        const token = await this.findMineOrFail(userId, id);
        await this.repository.update(token, { status: "inactive" });
        return (0, dto_1.toRefreshTokenResponse)(token);
    }
    /** Revoca todas las sesiones propias (útil si se sospecha un robo). */
    async revokeAllMine(userId) {
        return this.repository.revokeAllByUser(userId);
    }
    /** Purga las sesiones propias ya revocadas o expiradas. */
    async purgeMine(userId) {
        return this.repository.purgeInactiveByUser(userId);
    }
    async countActiveMine(userId) {
        return this.repository.countActiveByUser(userId);
    }
    // ================== CICLO DE VIDA ==================
    /** Emite una sesión nueva (alta de login). Genera un family_id nuevo. */
    async issue(userId, deviceInfo, transaction) {
        const rawToken = (0, password_1.generateOpaqueToken)();
        const familyId = (0, node_crypto_1.randomUUID)();
        const expiresAt = expiryFromNow();
        await this.repository.create({
            user_id: userId,
            token_hash: (0, password_1.sha256Hex)(rawToken),
            family_id: familyId,
            device_info: deviceInfo,
            expires_at: expiresAt,
            status: "active",
        }, transaction);
        // El token en claro se devuelve una sola vez; en la base solo queda el hash.
        return { rawToken, familyId, expiresAt };
    }
    /**
     * Rota un refresh token: lo invalida y emite uno nuevo con el mismo
     * family_id. Todo dentro de una transacción con bloqueo de fila.
     *
     * Concurrencia: si dos peticiones presentan el mismo token, una rota y
     * la otra encuentra el token ya inactivo -> se interpreta como
     * reutilización y se revoca la familia completa.
     */
    async rotate(rawToken, deviceInfo) {
        const hash = (0, password_1.sha256Hex)(rawToken);
        const outcome = await (0, with_transaction_1.withTransaction)(async (t) => {
            const current = await this.repository.findByHash(hash, t, true);
            if (!current) {
                return { kind: "invalid" };
            }
            // REUSE DETECTION: el token existía pero ya no está activo (fue rotado).
            if (current.status !== "active") {
                const revoked = await this.repository.revokeFamily(current.family_id, t);
                return { kind: "reuse", familyId: current.family_id, revoked };
            }
            if (new Date(current.expires_at).getTime() <= Date.now()) {
                await this.repository.update(current, { status: "inactive" }, t);
                return { kind: "expired" };
            }
            // Rotación: el token usado se invalida y nace uno nuevo en la misma familia.
            await this.repository.update(current, { status: "inactive" }, t);
            const rawNext = (0, password_1.generateOpaqueToken)();
            const expiresAt = expiryFromNow();
            await this.repository.create({
                user_id: current.user_id,
                token_hash: (0, password_1.sha256Hex)(rawNext),
                family_id: current.family_id,
                device_info: deviceInfo ?? current.device_info,
                expires_at: expiresAt,
                status: "active",
            }, t);
            return {
                kind: "rotated",
                userId: current.user_id,
                rawToken: rawNext,
                familyId: current.family_id,
                expiresAt,
            };
        });
        return outcome;
    }
    /**
     * Cierra la sesión asociada a un refresh token (logout).
     * Idempotente: un token inexistente o ya revocado no es un error, porque
     * el efecto deseado (que no sirva) ya se cumple.
     */
    async revokeByToken(rawToken) {
        const token = await this.repository.findByHash((0, password_1.sha256Hex)(rawToken));
        if (!token)
            return false;
        if (token.status !== "active")
            return true;
        await this.repository.update(token, { status: "inactive" });
        return true;
    }
    // ================== HELPERS ==================
    /**
     * Busca una sesión del propio usuario.
     * El filtro por user_id es la frontera de seguridad: un usuario nunca
     * puede ver ni revocar la sesión de otro. Un id ajeno responde 404.
     */
    async findMineOrFail(userId, id) {
        const token = await this.repository.findById(id);
        if (!token || token.user_id !== userId) {
            throw new app_error_1.AppError(404, "Session not found");
        }
        return token;
    }
}
exports.RefreshTokenService = RefreshTokenService;
/** now + REFRESH_TTL_DAYS. Ventana deslizante: cada rotación la renueva. */
function expiryFromNow() {
    return new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
}
//# sourceMappingURL=refresh-token.service.js.map