"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const user_repository_1 = require("../user/user.repository");
const refresh_token_service_1 = require("../refresh-token/refresh-token.service");
const resource_role_service_1 = require("../resource-role/resource-role.service");
const app_error_1 = require("../../../shared/errors/app-error");
const password_1 = require("../../../shared/auth/password");
const jwt_1 = require("../../../shared/auth/jwt");
/**
 * Capa Service del feature Session — el ciclo de vida de la sesión.
 *
 * Cubre las dos modalidades sin autorización granular:
 *
 *  Operación | Modalidad                   | Escribe seguridad
 *  login     | OPEN (valida credenciales)  | refresh_tokens (nueva familia)
 *  refresh   | OPEN (credencial de sesión) | refresh_tokens (rotación)
 *  logout    | OPEN (credencial de sesión) | refresh_tokens (revocación)
 *  profile   | JWT                         | — (solo lectura)
 *
 * Renovación automática: el cliente mantiene la sesión sin volver a pedir
 * credenciales llamando a refresh antes de que expire el access token. La
 * ventana del refresh token se reinicia en cada rotación (ventana deslizante).
 */
class SessionService {
    constructor(userRepository = new user_repository_1.UserRepository(), refreshTokenService = new refresh_token_service_1.RefreshTokenService(), resourceRoleService = new resource_role_service_1.ResourceRoleService()) {
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.resourceRoleService = resourceRoleService;
    }
    // ================== LOGIN (OPEN) ==================
    /**
     * Valida credenciales y abre una sesión.
     *
     * Nota de seguridad: la respuesta es la misma para "usuario inexistente"
     * y "contraseña incorrecta" (Invalid credentials), para no revelar qué
     * usuarios existen.
     */
    async login(body, deviceInfo) {
        if (!body.identifier || !body.password) {
            throw new app_error_1.AppError(400, "identifier and password are required");
        }
        const user = await this.userRepository.findByIdentifierWithPassword(body.identifier);
        if (!user || user.status !== "active") {
            throw new app_error_1.AppError(401, "Invalid credentials");
        }
        const matches = await (0, password_1.comparePassword)(body.password, user.password);
        if (!matches) {
            throw new app_error_1.AppError(401, "Invalid credentials");
        }
        const session = await this.refreshTokenService.issue(user.id, deviceInfo);
        return this.buildTokens(user, session.rawToken, session.expiresAt);
    }
    // ================== REFRESH (OPEN con credencial de sesión) ==================
    /**
     * Rota el refresh token y emite un par nuevo.
     *
     * Traduce el resultado de la rotación al error HTTP correspondiente:
     *  - invalid -> 401
     *  - expired -> 401
     *  - reuse   -> 401 (habiendo revocado toda la familia)
     */
    async refresh(body, deviceInfo) {
        if (!body.refresh_token) {
            throw new app_error_1.AppError(400, "refresh_token is required");
        }
        const outcome = await this.refreshTokenService.rotate(body.refresh_token, deviceInfo);
        if (outcome.kind === "invalid") {
            throw new app_error_1.AppError(401, "Invalid refresh token");
        }
        if (outcome.kind === "expired") {
            throw new app_error_1.AppError(401, "Refresh token expired");
        }
        if (outcome.kind === "reuse") {
            throw new app_error_1.AppError(401, "Refresh token reuse detected: session family revoked");
        }
        // Revalida la identidad: si el usuario fue desactivado, se corta la
        // sesión aunque el refresh token siga siendo válido.
        const user = await this.userRepository.findById(outcome.userId);
        if (!user || user.status !== "active") {
            await this.refreshTokenService.revokeAllMine(outcome.userId);
            throw new app_error_1.AppError(401, "User is not active");
        }
        return this.buildTokens(user, outcome.rawToken, outcome.expiresAt);
    }
    // ================== LOGOUT (OPEN con credencial de sesión) ==================
    /** Revoca la sesión del refresh token presentado. Idempotente. */
    async logout(body) {
        if (!body.refresh_token) {
            throw new app_error_1.AppError(400, "refresh_token is required");
        }
        await this.refreshTokenService.revokeByToken(body.refresh_token);
    }
    // ================== PERFIL (JWT) ==================
    /** Datos públicos del usuario autenticado. */
    async profile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user || user.status !== "active") {
            throw new app_error_1.AppError(404, "User not found");
        }
        return toProfile(user);
    }
    /** Permisos efectivos del propio usuario (modalidad JWT, sin RBAC). */
    async myPermissions(userId) {
        return this.resourceRoleService.findEffectiveForUser(userId);
    }
    // ================== HELPERS ==================
    /** Arma el par de tokens: firma el access y adjunta el refresh recién emitido. */
    buildTokens(user, refreshToken, refreshExpiresAt) {
        const access = (0, jwt_1.signAccessToken)({ id: user.id, username: user.username });
        return {
            access_token: access.token,
            token_type: "Bearer",
            expires_in: access.expiresIn,
            refresh_token: refreshToken,
            refresh_expires_in: Math.max(0, Math.floor((refreshExpiresAt.getTime() - Date.now()) / 1000)),
        };
    }
}
exports.SessionService = SessionService;
/** Proyección a ProfileDto: solo campos públicos. */
function toProfile(user) {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? null,
        status: user.status,
    };
}
//# sourceMappingURL=session.service.js.map