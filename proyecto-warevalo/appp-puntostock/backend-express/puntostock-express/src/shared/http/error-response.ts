import { Response } from "express";
import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize";
import { AppError } from "../errors/app-error";

/**
 * Traduce cualquier error a una respuesta HTTP. Único punto del proyecto
 * donde se decide el mapeo error -> status.
 *
 * Lo usan los dos sitios que pueden fallar antes de llegar a un controller:
 *  - BaseController.handleError (handlers de los controllers);
 *  - los middlewares de acceso (authenticate / authorize), que responden
 *    401/403 sin pasar por un controller.
 *
 * Reglas:
 *  - AppError                  -> su statusCode;
 *  - UniqueConstraintError     -> 409 (valor duplicado, ej. email ya registrado);
 *  - ValidationError           -> 400 (validaciones del modelo: isEmail, notEmpty...);
 *  - ForeignKeyConstraintError -> 409 (referencia a un registro inexistente o en uso);
 *  - cualquier otra cosa       -> 500 (y el detalle solo en el cuerpo, nunca el stack).
 *
 * UniqueConstraintError hereda de ValidationError, por eso se comprueba antes.
 */
export function sendError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof UniqueConstraintError) {
    const fields = error.errors.map((e) => e.path).filter(Boolean).join(", ");
    res.status(409).json({ error: `Ya existe un registro con ese valor (${fields || "campo único"})` });
    return;
  }

  if (error instanceof ValidationError) {
    res.status(400).json({ error: error.errors.map((e) => e.message).join(". ") });
    return;
  }

  if (error instanceof ForeignKeyConstraintError) {
    res.status(409).json({ error: "La operación viola una relación entre tablas (clave foránea)" });
    return;
  }

  res.status(500).json({ error: "Internal server error", detail: String(error) });
}
