"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepository = void 0;
const sequelize_1 = require("sequelize");
const refresh_token_model_1 = require("./refresh-token.model");
/**
 * Capa Repository del feature RefreshToken (tabla refresh_tokens).
 *
 * Única que habla con Sequelize. Las consultas que participan en la
 * rotación aceptan transacción y, cuando corresponde, bloquean la fila
 * (FOR UPDATE) para que dos peticiones de refresh simultáneas no emitan
 * dos tokens válidos.
 */
class RefreshTokenRepository {
    /**
     * Busca por hash del token.
     * lock: true añade FOR UPDATE dentro de la transacción: es lo que hace
     * que la rotación sea segura bajo concurrencia (solo una petición gana).
     */
    async findByHash(tokenHash, transaction, lock = false) {
        return refresh_token_model_1.RefreshToken.findOne({
            where: { token_hash: tokenHash },
            transaction,
            ...(lock ? { lock: transaction?.LOCK.UPDATE } : {}),
        });
    }
    /** Sesiones de un usuario (activas o todas según onlyActive). */
    async findAllByUser(userId, onlyActive = true) {
        const where = { user_id: userId };
        if (onlyActive)
            where.status = "active";
        return refresh_token_model_1.RefreshToken.findAll({ where, order: [["createdAt", "DESC"]] });
    }
    /** Una sesión por PK (o null). */
    async findById(id) {
        return refresh_token_model_1.RefreshToken.findByPk(id);
    }
    /** Inserta un refresh token (alta de sesión o rotación). */
    async create(data, transaction) {
        return refresh_token_model_1.RefreshToken.create(data, { transaction });
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(token, data, transaction) {
        return token.update(data, { transaction });
    }
    /**
     * Revoca toda la familia de rotación.
     * Se ejecuta al detectar reutilización de un token ya rotado: si un
     * atacante tiene una copia del token anterior, la sesión legítima se
     * invalida por completo.
     */
    async revokeFamily(familyId, transaction) {
        const [updated] = await refresh_token_model_1.RefreshToken.update({ status: "inactive" }, { where: { family_id: familyId, status: "active" }, transaction });
        return updated;
    }
    /** Revoca todas las sesiones activas de un usuario (cierre de sesión global). */
    async revokeAllByUser(userId) {
        const [updated] = await refresh_token_model_1.RefreshToken.update({ status: "inactive" }, { where: { user_id: userId, status: "active" } });
        return updated;
    }
    /** Elimina físicamente las sesiones ya expiradas o revocadas de un usuario. */
    async purgeInactiveByUser(userId) {
        return refresh_token_model_1.RefreshToken.destroy({
            where: {
                user_id: userId,
                [sequelize_1.Op.or]: [{ status: "inactive" }, { expires_at: { [sequelize_1.Op.lt]: new Date() } }],
            },
        });
    }
    /** Cuenta las sesiones activas de un usuario. */
    async countActiveByUser(userId) {
        return refresh_token_model_1.RefreshToken.count({ where: { user_id: userId, status: "active" } });
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
//# sourceMappingURL=refresh-token.repository.js.map