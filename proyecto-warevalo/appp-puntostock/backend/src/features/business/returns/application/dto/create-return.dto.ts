import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateReturnItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateReturnDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  saleId: number;

  @ApiProperty({ example: 'Producto en mal estado' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;

  @ApiProperty({ type: [CreateReturnItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReturnItemDto)
  items: CreateReturnItemDto[];
}
