import {
  LoginDto,
  LogoutSessionDto,
  ProfileDto,
  RefreshSessionDto,
  SessionTokensDto,
} from "./dto";
import { UserRepository } from "../user/user.repository";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
import { ResourceRoleService } from "../resource-role/resource-role.service";
import { EffectivePermissionDto } from "../resource-role/dto";
import { User } from "../user/user.model";
import { AppError } from "../../../shared/errors/app-error";
import { comparePassword } from "../../../shared/auth/password";
import { signAccessToken } from "../../../shared/auth/jwt";

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
export class SessionService {
  public constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly refreshTokenService: RefreshTokenService = new RefreshTokenService(),
    private readonly resourceRoleService: ResourceRoleService = new ResourceRoleService()
  ) {}

  // ================== LOGIN (OPEN) ==================
  /**
   * Valida credenciales y abre una sesión.
   *
   * Nota de seguridad: la respuesta es la misma para "usuario inexistente"
   * y "contraseña incorrecta" (Invalid credentials), para no revelar qué
   * usuarios existen.
   */
  public async login(body: LoginDto, deviceInfo: string | null): Promise<SessionTokensDto> {
    if (!body.identifier || !body.password) {
      throw new AppError(400, "identifier and password are required");
    }

    const user = await this.userRepository.findByIdentifierWithPassword(body.identifier);
    if (!user || user.status !== "active") {
      throw new AppError(401, "Invalid credentials");
    }

    const matches = await comparePassword(body.password, user.password);
    if (!matches) {
      throw new AppError(401, "Invalid credentials");
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
  public async refresh(
    body: RefreshSessionDto,
    deviceInfo: string | null
  ): Promise<SessionTokensDto> {
    if (!body.refresh_token) {
      throw new AppError(400, "refresh_token is required");
    }

    const outcome = await this.refreshTokenService.rotate(body.refresh_token, deviceInfo);

    if (outcome.kind === "invalid") {
      throw new AppError(401, "Invalid refresh token");
    }
    if (outcome.kind === "expired") {
      throw new AppError(401, "Refresh token expired");
    }
    if (outcome.kind === "reuse") {
      throw new AppError(401, "Refresh token reuse detected: session family revoked");
    }

    // Revalida la identidad: si el usuario fue desactivado, se corta la
    // sesión aunque el refresh token siga siendo válido.
    const user = await this.userRepository.findById(outcome.userId);
    if (!user || user.status !== "active") {
      await this.refreshTokenService.revokeAllMine(outcome.userId);
      throw new AppError(401, "User is not active");
    }

    return this.buildTokens(user, outcome.rawToken, outcome.expiresAt);
  }

  // ================== LOGOUT (OPEN con credencial de sesión) ==================
  /** Revoca la sesión del refresh token presentado. Idempotente. */
  public async logout(body: LogoutSessionDto): Promise<void> {
    if (!body.refresh_token) {
      throw new AppError(400, "refresh_token is required");
    }
    await this.refreshTokenService.revokeByToken(body.refresh_token);
  }

  // ================== PERFIL (JWT) ==================
  /** Datos públicos del usuario autenticado. */
  public async profile(userId: number): Promise<ProfileDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.status !== "active") {
      throw new AppError(404, "User not found");
    }
    return toProfile(user);
  }

  /** Permisos efectivos del propio usuario (modalidad JWT, sin RBAC). */
  public async myPermissions(userId: number): Promise<EffectivePermissionDto[]> {
    return this.resourceRoleService.findEffectiveForUser(userId);
  }

  // ================== HELPERS ==================
  /** Arma el par de tokens: firma el access y adjunta el refresh recién emitido. */
  private buildTokens(user: User, refreshToken: string, refreshExpiresAt: Date): SessionTokensDto {
    const access = signAccessToken({ id: user.id, username: user.username });
    return {
      access_token: access.token,
      token_type: "Bearer",
      expires_in: access.expiresIn,
      refresh_token: refreshToken,
      refresh_expires_in: Math.max(
        0,
        Math.floor((refreshExpiresAt.getTime() - Date.now()) / 1000)
      ),
    };
  }
}

/** Proyección a ProfileDto: solo campos públicos. */
function toProfile(user: User): ProfileDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar ?? null,
    status: user.status,
  };
}
