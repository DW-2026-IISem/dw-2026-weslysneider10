import { ApiProperty } from '@nestjs/swagger';
import { ReturnStatus } from '../../domain/enums/return-status.enum';

export class ReturnLineResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 59999 })
  unitPrice: number;

  @ApiProperty({ example: 59999 })
  total: number;
}

export class ReturnResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty({ example: 'Producto en mal estado' })
  reason: string;

  @ApiProperty({ example: 1 })
  saleId: number;

  @ApiProperty({ enum: ReturnStatus, example: ReturnStatus.COMPLETED })
  status: ReturnStatus;

  @ApiProperty({ example: 59999 })
  subtotal: number;

  @ApiProperty({ example: 59999 })
  total: number;

  @ApiProperty({ type: [ReturnLineResponseDto] })
  lines: ReturnLineResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
