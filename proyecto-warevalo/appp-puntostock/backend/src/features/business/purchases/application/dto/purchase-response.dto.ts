import { ApiProperty } from '@nestjs/swagger';
import { PurchaseStatus } from '../../domain/entities/purchase.entity';

export class PurchaseDetailResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 20 })
  quantityOrdered: number;

  @ApiProperty({ example: 0 })
  quantityReceived: number;

  @ApiProperty({ example: 27000 })
  unitCost: number;

  @ApiProperty({ example: 540000 })
  total: number;
}

export class PurchaseResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  purchaseDate: Date;

  @ApiProperty({ example: 1 })
  supplierId: number;

  @ApiProperty({ example: 1 })
  branchId: number;

  @ApiProperty({ enum: PurchaseStatus, example: PurchaseStatus.PENDING })
  status: PurchaseStatus;

  @ApiProperty({ example: 540000 })
  subtotal: number;

  @ApiProperty({ example: 102600 })
  tax: number;

  @ApiProperty({ example: 642600 })
  total: number;

  @ApiProperty({ type: [PurchaseDetailResponseDto] })
  items: PurchaseDetailResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
