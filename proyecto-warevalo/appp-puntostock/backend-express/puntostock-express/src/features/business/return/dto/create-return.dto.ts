/** Datos de entrada de `POST /api/devoluciones`. */
export interface CreateReturnDto {
  saleDetailId: number;
  motivo: string;
  cantidad: number;
}
