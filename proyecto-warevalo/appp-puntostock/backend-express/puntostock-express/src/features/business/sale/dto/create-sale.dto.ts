import { CreateSaleItemDto } from "./create-sale-item.dto";

/** Datos de entrada de `POST /api/ventas`. */
export interface CreateSaleDto {
  clientId: number;
  branchId: number;
  impuestos?: number;
  items: CreateSaleItemDto[];
}
