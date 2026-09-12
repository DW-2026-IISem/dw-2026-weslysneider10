import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ example: 'Sucursal Centro' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Sede principal' })
  @IsOptional()
  @IsString()
  description?: string;
}
