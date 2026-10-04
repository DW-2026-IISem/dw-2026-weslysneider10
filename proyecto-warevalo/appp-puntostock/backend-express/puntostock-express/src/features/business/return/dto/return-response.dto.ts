import { Return, ReturnI } from "../return.model";

/**
 * Respuesta HTTP de una devolución. La usan `GET /api/devoluciones`,
 * `GET /api/devoluciones/:id` y la salida de create/approve/reject.
 */
export type ReturnResponseDto = ReturnI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toReturnResponse(ret: Return): ReturnResponseDto {
  return ret.toJSON() as ReturnI;
}
