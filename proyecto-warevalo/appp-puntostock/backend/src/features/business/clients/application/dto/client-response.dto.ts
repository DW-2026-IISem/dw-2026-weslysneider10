import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../domain/entities/client.entity.js';

export class ClientResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tipoDocumento: string;

  @ApiProperty()
  numeroDocumento: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty({ nullable: true })
  telefono: string | null;

  @ApiProperty({ nullable: true })
  email: string | null;

  @ApiProperty()
  isActive: boolean;

  static fromEntity(client: Client): ClientResponseDto {
    const dto = new ClientResponseDto();
    dto.id = client.id as number;
    dto.tipoDocumento = client.tipoDocumento;
    dto.numeroDocumento = client.numeroDocumento;
    dto.nombre = client.nombre;
    dto.telefono = client.telefono;
    dto.email = client.email;
    dto.isActive = client.isActive;
    return dto;
  }
}
