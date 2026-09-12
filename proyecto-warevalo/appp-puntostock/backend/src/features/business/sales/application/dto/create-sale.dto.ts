import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSaleItemDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: 15000,
  })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateSaleDto {
  @ApiProperty({
    type: [CreateSaleItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];

  @ApiPropertyOptional({
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  clientId?: number;

  @ApiPropertyOptional({
    example: 2850,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tax?: number;

  @ApiPropertyOptional({
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discounts?: number;
}
