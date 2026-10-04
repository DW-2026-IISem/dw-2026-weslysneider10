import { Sale, SaleI } from "../sale.model";

/**
 * Respuesta HTTP de una venta. La usan `GET /api/ventas`,
 * `GET /api/ventas/:id` y la salida de create/cancel.
 *
 * Incluye `items` (SaleDetail[]) cuando el repository los trae con `include`.
 */
export type SaleResponseDto = SaleI & { items?: unknown[] };

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toSaleResponse(sale: Sale): SaleResponseDto {
  return sale.toJSON() as SaleResponseDto;
}
