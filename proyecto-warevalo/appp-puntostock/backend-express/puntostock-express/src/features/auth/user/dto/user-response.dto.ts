import { User, UserI } from "../user.model";

/**
 * Respuesta HTTP de un usuario.
 *
 * Regla del DTO: password nunca sale de la API. El repository ni siquiera
 * lo proyecta en las lecturas normales, pero el mapper lo elimina igual por
 * si el modelo se cargó con el hash (p. ej. al cambiar la contraseña).
 * Doble red: el tipo no lo permite y el mapper lo borra.
 */
export type UserResponseDto = Omit<UserI, "password">;

/** Mapper modelo -> DTO de respuesta (objeto plano; elimina password). */
export function toUserResponse(user: User): UserResponseDto {
  const { password, ...safe } = user.toJSON() as UserI & { password?: string };
  return safe;
}
