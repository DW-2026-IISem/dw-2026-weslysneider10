import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  quantityOrdered: number;

  @ApiProperty({ example: 27000 })
  @IsNumber()
  @IsPositive()
  unitCost: number;
}

export class CreatePurchaseDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  supplierId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  branchId: number;

  @ApiProperty({ type: [CreatePurchaseItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tax?: number;
}
