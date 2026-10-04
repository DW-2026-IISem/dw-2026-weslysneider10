import { Client, ClientI } from "../client.model";

/**
 * Respuesta HTTP de un cliente. La usan `GET /api/clientes`,
 * `GET /api/clientes/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone solo lo que declara este tipo.
 * Hoy coincide con el modelo completo; si en el futuro agregas un campo
 * sensible (ej. password hasheado), se excluye aquí con `Omit`.
 */
export type ClientResponseDto = ClientI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toClientResponse(client: Client): ClientResponseDto {
  return client.toJSON() as ClientI;
}
