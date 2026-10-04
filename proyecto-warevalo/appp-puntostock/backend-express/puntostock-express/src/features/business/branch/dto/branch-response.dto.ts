import { Branch, BranchI } from "../branch.model";

/**
 * Respuesta HTTP de una sucursal. La usan `GET /api/sucursales`,
 * `GET /api/sucursales/:id` y la salida de create/update/delete lógico.
 */
export type BranchResponseDto = BranchI;

/** Mapper modelo -> DTO de respuesta (objeto plano, sin metadatos de Sequelize). */
export function toBranchResponse(branch: Branch): BranchResponseDto {
  return branch.toJSON() as BranchI;
}
