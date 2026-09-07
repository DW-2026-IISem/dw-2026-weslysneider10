import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'CC' })
  @IsString()
  @IsNotEmpty()
  tipoDocumento: string;

  @ApiProperty({ example: '1082456789' })
  @IsString()
  @IsNotEmpty()
  numeroDocumento: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'juan.perez@correo.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
