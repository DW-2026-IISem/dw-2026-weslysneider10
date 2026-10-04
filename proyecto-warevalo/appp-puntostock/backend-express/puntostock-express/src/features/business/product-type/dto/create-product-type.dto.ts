/** Datos de entrada de `POST /api/tipos-productos`. */
export interface CreateProductTypeDto {
  name: string;
  description?: string | null;
  /** Opcional: por defecto `active`. Tras crearlo, el estado solo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
