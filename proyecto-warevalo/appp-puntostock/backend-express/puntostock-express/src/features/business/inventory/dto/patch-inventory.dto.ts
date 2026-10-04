import { UpdateInventoryDto } from "./update-inventory.dto";

/** Datos de entrada de `PATCH /api/inventarios/:id` (actualización parcial). */
export type PatchInventoryDto = Partial<UpdateInventoryDto>;
