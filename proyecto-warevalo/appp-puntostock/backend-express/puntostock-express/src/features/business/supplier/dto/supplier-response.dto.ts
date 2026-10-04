import { Supplier, SupplierI } from "../supplier.model";

/**
 * Respuesta HTTP de un proveedor. La usan `GET /api/proveedores`,
 * `GET /api/proveedores/:id` y la salida de create/update/delete lógico.
 */
export type SupplierResponseDto = SupplierI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toSupplierResponse(supplier: Supplier): SupplierResponseDto {
  return supplier.toJSON() as SupplierI;
}
