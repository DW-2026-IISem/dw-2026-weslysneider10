import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'SKU-001',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @ApiProperty({
    example: 'Arroz Diana 500g',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({
    example: 'Arroz blanco de 500 gramos',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 4500.00,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
