/** Datos de entrada de `POST /api/inventarios`. */
export interface CreateInventoryDto {
  branchId: number;
  productId: number;
  quantity?: number;
  minStock?: number;
}
