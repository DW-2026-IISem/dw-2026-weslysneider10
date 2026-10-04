import { UpdateSupplierDto } from "./update-supplier.dto";

/** Datos de entrada de `PATCH /api/proveedores/:id` (actualización parcial). */
export type PatchSupplierDto = Partial<UpdateSupplierDto>;
