import { CreateInventoryDto } from './create-inventory.dto';
declare const UpdateInventoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateInventoryDto, "productId" | "branchId">>>;
export declare class UpdateInventoryDto extends UpdateInventoryDto_base {
}
export {};
