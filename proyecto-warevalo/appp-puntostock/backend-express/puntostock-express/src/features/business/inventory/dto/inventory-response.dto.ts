import { Inventory, InventoryI } from "../inventory.model";

/**
 * Respuesta HTTP de un registro de inventario. La usan `GET /api/inventarios`,
 * `GET /api/inventarios/:id`, `GET /api/inventarios/low-stock` y la salida
 * de create/update.
 */
export type InventoryResponseDto = InventoryI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toInventoryResponse(inventory: Inventory): InventoryResponseDto {
  return inventory.toJSON() as InventoryI;
}
