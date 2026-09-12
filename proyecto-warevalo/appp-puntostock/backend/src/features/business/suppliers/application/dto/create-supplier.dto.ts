import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: '900123456' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nit: string;

  @ApiProperty({ example: 'Distribuidora La Guajira SAS' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  businessName: string;

  @ApiPropertyOptional({ example: 'Carlos Ramírez' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  contactName?: string;

  @ApiPropertyOptional({ example: '+57 300 1112233' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiPropertyOptional({ example: 'ventas@distribuidoralaguajira.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;
}
