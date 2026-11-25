import { AppError } from "../errors/app-error";

/**
 * Valida una lista de ids que llega en el cuerpo (ej. role_ids, resource_ids).
 *
 * - debe ser un arreglo (puede ir vacío: "ninguna casilla marcada");
 * - cada elemento, un entero positivo;
 * - se eliminan duplicados.
 */
export function parseIdList(value: unknown, field: string): number[] {
  if (!Array.isArray(value)) {
    throw new AppError(400, `${field} must be an array of ids`);
  }
  const ids = value.map((v) => Number(v));
  if (ids.some((id) => !Number.isInteger(id) || id < 1)) {
    throw new AppError(400, `${field} must contain only positive integers`);
  }
  return [...new Set(ids)];
}
