import { RoleUser, RoleUserI } from "../role-user.model";

/**
 * Respuesta HTTP de una asignación usuario-rol.
 *
 * Incluye un resumen del usuario (sin password) y del rol para que el
 * consumidor no tenga que hacer dos peticiones extra.
 */
export interface RoleUserResponseDto extends RoleUserI {
  user?: { id: number; username: string; email: string } | null;
  role?: { id: number; name: string } | null;
}

/** Mapper modelo -> DTO de respuesta (objeto plano, con resúmenes si vienen). */
export function toRoleUserResponse(roleUser: RoleUser): RoleUserResponseDto {
  return roleUser.toJSON() as RoleUserResponseDto;
}
