import { Client, ClientI } from "../client.model";

/**
 * DTO público: excluye siempre la contraseña.
 */
export type ClientResponseDto = Omit<ClientI, "password">;

/**
 * Convierte el modelo Sequelize en una respuesta segura.
 */
export function toClientResponse(client: Client): ClientResponseDto {
  const { password: _password, ...safeClient } = client.toJSON() as ClientI;

  return safeClient;
}
