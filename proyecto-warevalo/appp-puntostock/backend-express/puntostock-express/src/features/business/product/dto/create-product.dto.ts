/** Datos de entrada de `POST /api/productos`. */
export interface CreateProductDto {
  sku: string;
  name: string;
  description?: string | null;
  price: number;
  productTypeId: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado solo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
