import { Client, ClientI } from "../client.model";

/** DTO público del cliente (la tabla ya no guarda credenciales). */
export type ClientResponseDto = ClientI;

/** Convierte el modelo Sequelize en un objeto plano para la respuesta. */
export function toClientResponse(client: Client): ClientResponseDto {
  return client.toJSON() as ClientI;
}
