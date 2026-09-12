import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty({
    example: 'Electrónica',
    description: 'Nombre del tipo de producto',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 'Dispositivos electrónicos y accesorios',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
