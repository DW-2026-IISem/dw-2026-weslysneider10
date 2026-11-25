import { CreateRoleUserDto, RoleUserResponseDto, toRoleUserResponse } from "./dto";
import { RoleUserRepository } from "./role-user.repository";
import { RoleUser } from "./role-user.model";
import { UserRepository } from "../user/user.repository";
import { RoleRepository } from "../role/role.repository";
import { AppError } from "../../../shared/errors/app-error";
import { withTransaction } from "../../../shared/database/with-transaction";
import { parseIdList } from "../../../shared/http/id-list";


/**
 * Capa Service del feature RoleUser — asignaciones usuario <-> rol.
 *
 * Reglas de negocio:
 * - Solo se asigna un rol activo a un usuario activo.
 * - Asignar es idempotente: si la pareja ya existía desactivada, se
 *   reactiva; si ya estaba activa, 409 sin duplicar filas.
 * - Retirar es un borrado lógico: preserva la auditoría y es reversible.
 */
export class RoleUserService {
  public constructor(
    private readonly repository: RoleUserRepository = new RoleUserRepository(),
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly roleRepository: RoleRepository = new RoleRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<RoleUserResponseDto[]> {
    const assignments = await this.repository.findAllActive();
    return assignments.map((assignment) => toRoleUserResponse(assignment));
  }

  public async getOne(id: number): Promise<RoleUserResponseDto> {
    return toRoleUserResponse(await this.findOrFail(id));
  }

  // ================== CREATE (asignar) ==================
  /** Asigna un rol a un usuario (o reactiva la asignación existente). */
  public async assign(body: CreateRoleUserDto): Promise<RoleUserResponseDto> {
    if (!body.user_id || !body.role_id) {
      throw new AppError(400, "user_id and role_id are required");
    }

    await this.assertUserActive(body.user_id);
    await this.assertRoleActive(body.role_id);

    const existing = await this.repository.findByUserAndRole(body.user_id, body.role_id);
    if (existing) {
      if (existing.status === "active") {
        throw new AppError(409, "Role is already assigned to this user");
      }
      const reactivated = await this.repository.update(existing, { status: "active" });
      return toRoleUserResponse(await this.reload(reactivated.id));
    }

    const created = await this.repository.create({
      user_id: body.user_id,
      role_id: body.role_id,
      status: "active",
    });
    return toRoleUserResponse(await this.reload(created.id));
  }

  // ================== STATE (retirar / reactivar) ==================
  /** Retirar el rol -> status = inactive. El usuario pierde los permisos del rol. */
  public async deactivate(id: number): Promise<RoleUserResponseDto> {
    const assignment = await this.findOrFail(id);
    await this.repository.update(assignment, { status: "inactive" });
    return toRoleUserResponse(await this.reload(assignment.id));
  }

  /** Reactivar la asignación. */
  public async reactivate(id: number): Promise<RoleUserResponseDto> {
    const assignment = await this.findOrFail(id, false);
    if (assignment.status === "active") {
      throw new AppError(409, "Assignment is already active");
    }
    await this.repository.update(assignment, { status: "active" });
    return toRoleUserResponse(await this.reload(assignment.id));
  }

  // ================== ROLES DE UN USUARIO (casillas) ==================
  /** ids de los roles activos asignados (asignación activa) a un usuario. */
  public async getRoleIdsForUser(userId: number): Promise<number[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const rows = await this.repository.findAllByUser(userId);
    return rows.filter((row) => row.status === "active").map((row) => row.role_id);
  }

  /**
   * Deja los roles de un usuario exactamente en `role_ids` (lo marcado en
   * las casillas), en una sola transacción:
   *  - rol marcado sin asignación        -> se crea;
   *  - rol marcado con asignación inactiva -> se reactiva;
   *  - asignación activa no marcada      -> se retira (inactive, reversible).
   *
   * Regla anti-bloqueo: nadie puede cambiar sus propios roles (podría
   * quitarse el rol ADMIN y quedarse sin acceso al panel).
   */
  public async setUserRoles(
    userId: number,
    rawRoleIds: unknown,
    requesterId: number
  ): Promise<number[]> {
    if (userId === requesterId) {
      throw new AppError(400, "No puedes modificar tus propios roles");
    }

    const roleIds = parseIdList(rawRoleIds, "role_ids");
    await this.assertUserActive(userId);
    for (const roleId of roleIds) {
      await this.assertRoleActive(roleId);
    }

    const wanted = new Set(roleIds);

    await withTransaction(async (t) => {
      const existing = await this.repository.findAllByUser(userId, t);
      const byRole = new Map(existing.map((row) => [row.role_id, row]));

      for (const roleId of wanted) {
        const row = byRole.get(roleId);
        if (!row) {
          await this.repository.create({ user_id: userId, role_id: roleId, status: "active" }, t);
        } else if (row.status !== "active") {
          await this.repository.update(row, { status: "active" }, t);
        }
      }

      for (const row of existing) {
        if (!wanted.has(row.role_id) && row.status === "active") {
          await this.repository.update(row, { status: "inactive" }, t);
        }
      }
    });

    return [...wanted];
  }

  // ================== HELPERS ==================
  private async findOrFail(id: number, onlyActive = true): Promise<RoleUser> {
    const assignment = await this.repository.findById(id);
    if (!assignment || (onlyActive && assignment.status !== "active")) {
      throw new AppError(404, "Role assignment not found");
    }
    return assignment;
  }

  private async reload(id: number): Promise<RoleUser> {
    const assignment = await this.repository.findById(id);
    if (!assignment) {
      throw new AppError(404, "Role assignment not found");
    }
    return assignment;
  }

  private async assertUserActive(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.status !== "active") {
      throw new AppError(404, "User not found or inactive");
    }
  }

  private async assertRoleActive(roleId: number): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role || role.status !== "active") {
      throw new AppError(404, "Role not found or inactive");
    }
  }
}
