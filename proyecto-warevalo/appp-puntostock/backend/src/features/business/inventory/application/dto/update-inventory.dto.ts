import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(
  OmitType(CreateInventoryDto, ['branchId', 'productId'] as const),
) {}
