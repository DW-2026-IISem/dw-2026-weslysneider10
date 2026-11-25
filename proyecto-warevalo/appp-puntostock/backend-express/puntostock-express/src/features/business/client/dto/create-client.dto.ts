/**
 * Datos de entrada de `POST /api/clientes`.
 * name es obligatorio; address, phone y email son opcionales
 * (una cadena vacía se guarda como NULL).
 */
export interface CreateClientDto {
  name: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  /** Opcional: por defecto `active`. Tras crearlo, el estado solo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
