import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  branchId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 20, default: 0 })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 5, default: 0 })
  @IsInt()
  @Min(0)
  minStock: number;
}
