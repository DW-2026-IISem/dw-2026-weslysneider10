/** Datos de entrada de `POST /api/proveedores`. */
export interface CreateSupplierDto {
  nit: string;
  razonSocial: string;
  contacto?: string | null;
  telefono?: string | null;
  email?: string | null;
  /** Opcional: por defecto `true`. Tras crearlo, el estado solo cambia con el borrado lógico. */
  isActive?: boolean;
}
