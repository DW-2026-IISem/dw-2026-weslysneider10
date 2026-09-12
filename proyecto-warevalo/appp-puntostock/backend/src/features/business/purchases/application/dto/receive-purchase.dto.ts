import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';

export class ReceivePurchaseItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 10, description: 'Cantidad recibida en esta entrega (puede ser parcial)' })
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class ReceivePurchaseDto {
  @ApiProperty({ type: [ReceivePurchaseItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceivePurchaseItemDto)
  items: ReceivePurchaseItemDto[];
}
