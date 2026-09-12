import { ApiProperty } from '@nestjs/swagger';

export class InventoryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  branchId: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 20 })
  quantity: number;

  @ApiProperty({ example: 5 })
  minStock: number;

  @ApiProperty({ example: false })
  isLowStock: boolean;

  @ApiProperty()
  updatedAt: Date;
}
