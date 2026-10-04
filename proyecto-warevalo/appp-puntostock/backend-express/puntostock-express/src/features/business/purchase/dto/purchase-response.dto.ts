import { Purchase, PurchaseI } from "../purchase.model";

/**
 * Respuesta HTTP de una compra. La usan `GET /api/compras`,
 * `GET /api/compras/:id` y la salida de create/receive/cancel.
 *
 * Incluye `items` (PurchaseDetail[]) cuando el repository los trae con
 * `include`; el tipo lo deja opcional porque `cancel` no los recarga.
 */
export type PurchaseResponseDto = PurchaseI & { items?: unknown[] };

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toPurchaseResponse(purchase: Purchase): PurchaseResponseDto {
  return purchase.toJSON() as PurchaseResponseDto;
}
