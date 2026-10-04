/** Datos de entrada de `POST /api/sucursales`. */
export interface CreateBranchDto {
  name: string;
  description?: string | null;
  /** Opcional: por defecto `active`. Tras crearla, el estado solo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
