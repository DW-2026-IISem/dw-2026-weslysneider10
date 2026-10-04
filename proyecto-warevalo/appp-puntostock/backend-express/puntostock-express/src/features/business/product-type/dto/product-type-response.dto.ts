import { ProductType, ProductTypeI } from "../product-type.model";

/**
 * Respuesta HTTP de un tipo de producto. La usan `GET /api/tipos-productos`,
 * `GET /api/tipos-productos/:id` y la salida de create/update/delete lógico.
 */
export type ProductTypeResponseDto = ProductTypeI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toProductTypeResponse(productType: ProductType): ProductTypeResponseDto {
  return productType.toJSON() as ProductTypeI;
}
