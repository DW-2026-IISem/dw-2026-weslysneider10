import { CreatePurchaseItemDto } from "./create-purchase-item.dto";

/** Datos de entrada de `POST /api/compras`. */
export interface CreatePurchaseDto {
  supplierId: number;
  branchId: number;
  impuestos?: number;
  items: CreatePurchaseItemDto[];
}
