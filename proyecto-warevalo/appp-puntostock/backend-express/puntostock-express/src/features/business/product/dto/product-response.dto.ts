import { Product, ProductI } from "../product.model";

/**
 * Respuesta HTTP de un producto. La usan `GET /api/productos`,
 * `GET /api/productos/:id` y la salida de create/update/delete lógico.
 */
export type ProductResponseDto = ProductI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toProductResponse(product: Product): ProductResponseDto {
  return product.toJSON() as ProductI;
}
