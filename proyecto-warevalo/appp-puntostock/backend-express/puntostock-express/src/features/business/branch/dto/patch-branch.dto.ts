import { UpdateBranchDto } from "./update-branch.dto";

/** Datos de entrada de `PATCH /api/sucursales/:id` (actualización parcial). */
export type PatchBranchDto = Partial<UpdateBranchDto>;
